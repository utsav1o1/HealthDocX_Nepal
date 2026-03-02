import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIExtractedData } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeDocument(imageUrl: string): Promise<AIExtractedData> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

    const prompt = `You are a medical document analysis AI. Analyze this medical document image and extract the following information in JSON format:

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
IMPORTANT: Return ONLY valid JSON, no markdown formatting, no code blocks.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
    ]);

    const response = result.response;
    const text = response.text();

    // Clean up the response - remove markdown code blocks if present
    const cleanedText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

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
  } catch (error) {
    console.error('AI Analysis Error:', error);
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
