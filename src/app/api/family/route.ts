import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import FamilyMember from '@/models/FamilyMember';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const userId = (session.user as any).id;
    const members = await FamilyMember.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ members });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, relationship, dateOfBirth, bloodGroup, allergies, notes } = body;

    if (!name || !relationship) {
      return NextResponse.json({ error: 'Name and relationship are required' }, { status: 400 });
    }

    await dbConnect();
    const userId = (session.user as any).id;

    const member = await FamilyMember.create({
      userId,
      name,
      relationship,
      dateOfBirth,
      bloodGroup,
      allergies: allergies || [],
      notes,
    });

    return NextResponse.json({ member }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
