import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import FamilyMember from '@/models/FamilyMember';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const member = await FamilyMember.findById(id);

    if (!member) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    if (member.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updated = await FamilyMember.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ member: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const member = await FamilyMember.findById(id);

    if (!member) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    if (member.userId.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await FamilyMember.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Family member removed' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
