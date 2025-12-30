// src/app/api/users/[id]/promote/route.ts
import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const db = readDb();
  const userIndex = db.users.findIndex((u: User) => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  db.users[userIndex].role = 'admin';
  writeDb(db);

  return NextResponse.json(db.users[userIndex]);
}
