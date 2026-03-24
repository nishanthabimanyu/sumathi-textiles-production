import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

export function verifyAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.split(' ')[1];
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, role] = decoded.split(':');
    
    if (!username || !role) return false;

    if (fs.existsSync(USERS_FILE)) {
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      return users.some((u: any) => u.username === username && u.role === role);
    }
    return false;
  } catch {
    return false;
  }
}
