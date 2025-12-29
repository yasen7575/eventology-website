import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'data/db.json');

const initialDb = {
  users: [],
  applications: [],
inquiries: [],
  settings: {
    formsEnabled: true
  }
};

function writeDb(data: any): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function POST() {
  writeDb(initialDb);
  return NextResponse.json({ message: 'Database wiped' }, { status: 200 });
}
