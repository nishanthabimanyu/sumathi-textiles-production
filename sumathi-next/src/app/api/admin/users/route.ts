import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

function verifyOwner(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    // For Owners only access to users management
    const [user, role] = decoded.split(':'); // Format: "username:role"
    return role === 'Owner';
  } catch {
    return false;
  }
}

function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

export async function GET(request: Request) {
  if (!verifyOwner(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getUsers());
}

export async function POST(request: Request) {
  if (!verifyOwner(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const users = getUsers();
    const newUser = {
      id: Date.now(),
      username: body.username,
      password: body.password || '123456',
      role: body.role || 'Staff'
    };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyOwner(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const users = getUsers();
    const filtered = users.filter((u: any) => u.id !== Number(id) && u.role !== 'Owner'); // Don't delete owners safety
    fs.writeFileSync(USERS_FILE, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
