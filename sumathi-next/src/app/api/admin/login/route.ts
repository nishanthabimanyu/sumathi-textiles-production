import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ error: 'Auth Subsystem Failure' }, { status: 500 });
    }
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      // Create simple token: btoa("username:role")
      const token = btoa(`${user.username}:${user.role}`);
      return NextResponse.json({ success: true, token, role: user.role, username: user.username });
    } else {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
