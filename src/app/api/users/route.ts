import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/services/storage';

const dbPath = path.resolve(process.cwd(), 'data/db.json');

function readDb(): any {
  const dbData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(dbData);
}

function writeDb(data: any): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.users);
}

export async function POST(request: Request) {
  const newUser: User = await request.json();
  const db = readDb();

  const existingUser = db.users.find((u: User) => u.email === newUser.email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  db.users.push(newUser);
  writeDb(db);

  return NextResponse.json(newUser, { status: 201 });
}
