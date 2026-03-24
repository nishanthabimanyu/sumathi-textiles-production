import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sumathi2024';

function verifyAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return token === ADMIN_PASSWORD || decoded === ADMIN_PASSWORD;
  } catch {
    return token === ADMIN_PASSWORD;
  }
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Ensure upload dir exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    // Return the relative URL path that will be saved in content.json
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });

  } catch (error) {
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
