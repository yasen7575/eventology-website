import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SystemSettings } from '@/services/storage';

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
  return NextResponse.json(db.settings);
}

export async function POST(request: Request) {
  const newSettings: Partial<SystemSettings> = await request.json();
  const db = readDb();

  const updatedSettings = { ...db.settings, ...newSettings };
  db.settings = updatedSettings;
  writeDb(db);

  return NextResponse.json(updatedSettings, { status: 200 });
}
