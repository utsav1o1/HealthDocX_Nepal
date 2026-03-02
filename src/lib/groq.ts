import Groq from 'groq-sdk';
import { ApiConfig } from '@/models/ApiConfig';
import dbConnect from '@/lib/mongodb';
import type { AIExtractedData } from '@/types';

async function getActiveGroqKey(): Promise<{ key: string; id?: string }> {
    await dbConnect();

    const config = await ApiConfig.findOne({ provider: 'groq' });

    if (config && config.keys && config.keys.length > 0) {
        // Find the first active and non-rate-limited key
        const currentKey = config.keys.find(
            (k: any) => k.isActive && !k.isRateLimited
        );

        if (currentKey) {
            return { key: currentKey.key, id: currentKey._id.toString() };
        }
    }

    // Fallback to environment variable if no valid key is found in DB
    return { key: process.env.GROQ_API_KEY || '' };
}

async function markKeyAsRateLimited(keyId: string) {
    await dbConnect();
    await ApiConfig.updateOne(
        { provider: 'groq', 'keys._id': keyId },
        {
            $set: {
                'keys.$.isRateLimited': true,
                'keys.$.lastRateLimitedAt': new Date(),
            },
        }
    );
}

async function incrementKeyUsage(keyId: string) {
    await dbConnect();
    await ApiConfig.updateOne(
        { provider: 'groq', 'keys._id': keyId },
        {
            $inc: { 'keys.$.requestCount': 1 },
            $set: { 'keys.$.lastUsedAt': new Date() },
        }
    );
}

export async function analyzeDocument(imageUrl: string, isRetry = false): Promise<AIExtractedData> {
    const { key, id } = await getActiveGroqKey();

    if (!key) {
        throw new Error('No valid Groq API key found.');
    }

    const groq = new Groq({ apiKey: key });

    try {
        // Increment usage
        if (id) await incrementKeyUsage(id);

        // Using Groq's vision model
        const response = await groq.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `You are a medical document analysis AI. Analyze this medical document image and extract the following information in strict JSON format:

{
  "summary": "A brief 2-3 sentence summary of the document",
  "diagnosis": ["List of diagnoses mentioned"],
  "medications": ["List of medications with dosages if available"],
  "procedures": ["Any medical procedures mentioned"],
  "doctorName": "Name of the doctor if visible",
  "hospitalName": "Name of the hospital/clinic if visible",
  "dateOfVisit": "Date of the visit if visible (YYYY-MM-DD format)",
  "recommendations": ["Any recommendations or follow-up instructions"],
  "keyFindings": ["Key medical findings or test results"]
}

If any field is not found in the document, use null for single values or empty array [] for arrays.
IMPORTANT: Return ONLY valid JSON.`
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageUrl
                            }
                        }
                    ]
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1, // Low temp for more deterministic output
        });

        const text = response.choices[0]?.message?.content || '';

        // Clean up the response if needed (though json_object format should be clean)
        const cleanedText = text.trim();

        try {
            const parsed = JSON.parse(cleanedText);
            return {
                summary: parsed.summary || 'Unable to extract summary',
                diagnosis: parsed.diagnosis || [],
                medications: parsed.medications || [],
                procedures: parsed.procedures || [],
                doctorName: parsed.doctorName || undefined,
                hospitalName: parsed.hospitalName || undefined,
                dateOfVisit: parsed.dateOfVisit || undefined,
                recommendations: parsed.recommendations || [],
                keyFindings: parsed.keyFindings || [],
            };
        } catch (parseError) {
            console.error('Failed to parse Groq response as JSON:', cleanedText);
            throw new Error('Invalid JSON format from AI.');
        }

    } catch (error: any) {
        console.error('Groq AI Analysis Error:', error);

        // Check for rate limiting (status 429)
        if (error?.status === 429 && id && !isRetry) {
            console.warn('Groq key hit rate limit. Marking as limited and retrying...');
            await markKeyAsRateLimited(id);

            // Retry exactly once
            return analyzeDocument(imageUrl, true);
        }

        return {
            summary: 'AI analysis could not be completed. Please review the document manually.',
            diagnosis: [],
            medications: [],
            procedures: [],
            recommendations: [],
            keyFindings: [],
        };
    }
}
