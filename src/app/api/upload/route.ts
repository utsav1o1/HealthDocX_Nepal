import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';
import DocumentModel from '@/models/Document';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { url, publicId } = await uploadToCloudinary(buffer, 'healthdocx');

    await dbConnect();

    const userId = (session.user as any).id;

    const doc = await DocumentModel.create({
      userId,
      title: formData.get('title') || file.name,
      description: formData.get('description') || '',
      fileUrl: url,
      filePublicId: publicId,
      fileType: file.type,
      hospital: formData.get('hospital') || '',
      doctor: formData.get('doctor') || '',
      category: formData.get('category') || 'other',
      familyMemberId: formData.get('familyMemberId') || null,
      familyMemberName: formData.get('familyMemberName') || '',
      date: formData.get('date') || new Date(),
    });

    return NextResponse.json({ document: doc, fileUrl: url }, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
