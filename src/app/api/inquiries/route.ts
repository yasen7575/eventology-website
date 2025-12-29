import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Inquiry } from '@/services/storage';

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
  return NextResponse.json(db.inquiries);
}

export async function POST(request: Request) {
  const newInquiry: Omit<Inquiry, "id" | "createdAt" | "status"> = await request.json();
  const db = readDb();

  const inquiry: Inquiry = {
    ...newInquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new"
  };

  db.inquiries.push(inquiry);
  writeDb(db);

  return NextResponse.json(inquiry, { status: 201 });
}
