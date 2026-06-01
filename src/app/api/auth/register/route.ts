import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopease';

export async function POST(request: NextRequest) {
  const { email, password, confirmPassword } = await request.json();

  if (!email || !password || !confirmPassword) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Create user
    const newUser = {
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    await client.close();

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
