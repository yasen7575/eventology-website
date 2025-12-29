import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Application } from '@/services/storage';

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
  return NextResponse.json(db.applications);
}

export async function POST(request: Request) {
  const newApp: Omit<Application, "id" | "createdAt" | "status"> = await request.json();
  const db = readDb();

  const application: Application = {
    ...newApp,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  db.applications.push(application);
  writeDb(db);

  return NextResponse.json(application, { status: 201 });
}
