import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { analyzeDocument } from '@/lib/groq';
import dbConnect from '@/lib/mongodb';
import DocumentModel from '@/models/Document';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId, fileUrl } = await request.json();

    if (!documentId || !fileUrl) {
      return NextResponse.json({ error: 'Document ID and file URL are required' }, { status: 400 });
    }

    const aiData = await analyzeDocument(fileUrl);

    await dbConnect();

    const updatedDoc = await DocumentModel.findByIdAndUpdate(
      documentId,
      {
        aiExtractedData: aiData,
        ...(aiData.hospitalName && { hospital: aiData.hospitalName }),
        ...(aiData.doctorName && { doctor: aiData.doctorName }),
      },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ document: updatedDoc, aiData });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
