import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/content.server';
import { SiteContent } from '@/lib/content';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as SiteContent;
    
    // Basic structural validation could be added here
    if (!body.hero || !body.festivals) {
      return NextResponse.json({ error: 'Invalid content structure' }, { status: 400 });
    }

    const success = saveContent(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to write content to disk' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}
