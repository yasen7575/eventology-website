// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/services/storage';

const dbPath = path.resolve(process.cwd(), 'data/db.json');

// Fallback credentials for testing purposes when environment variables are not set.
const SUPER_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ya3777250@gmail.com';
const SUPER_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Ak998877';

function readDb(): any {
  const dbData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(dbData);
}

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: 'Username/Email and password are required' }, { status: 400 });
  }

  // Super Admin Check
  if (identifier === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASS) {
    const superAdmin: User = {
        id: "super_admin_001",
        name: "System Administrator",
        email: SUPER_ADMIN_EMAIL,
        role: "super_admin",
        isVerified: true
    };
    return NextResponse.json({ user: superAdmin, token: "mock-super-admin-token" });
  }

  // Regular User Check
  const db = readDb();
  const user = db.users.find((u: User) => u.email === identifier && u.password === password);

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  if (!user.isVerified) {
    return NextResponse.json({ message: 'Account not verified' }, { status: 403 });
  }

  const { password: _, ...safeUser } = user;

  return NextResponse.json({ user: safeUser, token: "mock-user-token" });
}
