import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import DocumentModel from '@/models/Document';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const userId = (session.user as any).id;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const familyMemberId = searchParams.get('familyMemberId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = { userId };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (familyMemberId) {
      query.familyMemberId = familyMemberId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
        { doctor: { $regex: search, $options: 'i' } },
        { 'aiExtractedData.summary': { $regex: search, $options: 'i' } },
      ];
    }

    const total = await DocumentModel.countDocuments(query);
    const documents = await DocumentModel.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      documents,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
