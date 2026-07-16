import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const usersCol = db.collection('users');

    const users = await usersCol.find({}).sort({ createdAt: -1 }).toArray();

    const sanitizedUsers = users.map((u) => ({
      id: u._id.toHexString(),
      email: u.email,
      role: u.role || 'user',
      createdAt: u.createdAt?.toISOString(),
      updatedAt: u.updatedAt?.toISOString(),
    }));

    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
