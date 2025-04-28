import { sign, verify } from 'jsonwebtoken';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// Zajistíme, že JWT_SECRET je vždy definován
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET není definován v .env.local');
}

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyAuth(cookieStore: ReadonlyRequestCookies) {
  try {
    const token = cookieStore.get('auth-token');
    if (!token) {
      console.log('Auth: Token nenalezen v cookies');
      return { isAuthenticated: false };
    }

    const isValid = verifyToken(token.value);
    console.log('Auth: Výsledek ověření tokenu:', isValid);
    return { isAuthenticated: isValid };
  } catch (error) {
    console.error('Auth: Chyba při ověřování autentizace:', error);
    return { isAuthenticated: false };
  }
}

export function generateToken(): string {
  console.log('Auth: Generuji token s JWT_SECRET:', JWT_SECRET);
  const token = sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  console.log('Auth: Vygenerovaný token:', token);
  return token;
}

export function verifyToken(token: string): boolean {
  try {
    console.log('Auth: Ověřuji token:', token);
    console.log('Auth: Používám JWT_SECRET:', JWT_SECRET);
    const decoded = verify(token, JWT_SECRET);
    console.log('Auth: Dekódovaný token:', decoded);
    return (decoded as any).role === 'admin';
  } catch (error) {
    console.error('Auth: Chyba při verifikaci tokenu:', error);
    return false;
  }
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  console.log('Auth: Validace credentials pro uživatele:', username);
  
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT password FROM admins WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        console.log('Auth: Uživatel nenalezen');
        return false;
      }

      const admin = result.rows[0] as { password: string };
      const isValid = await bcrypt.compare(password, admin.password);
      console.log('Auth: Výsledek validace:', isValid);
      return isValid;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Auth: Chyba při validaci credentials:', error);
    return false;
  }
}

export async function changePassword(username: string, currentPassword: string, newPassword: string): Promise<boolean> {
  console.log('Auth: Změna hesla pro uživatele:', username);
  
  try {
    const client = await pool.connect();
    try {
      // Nejprve ověříme aktuální heslo
      const result = await client.query(
        'SELECT password FROM admins WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        console.log('Auth: Uživatel nenalezen');
        return false;
      }

      const admin = result.rows[0] as { password: string };
      const isValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isValid) {
        console.log('Auth: Nesprávné aktuální heslo');
        return false;
      }

      // Pokud je heslo správné, aktualizujeme ho
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await client.query(
        'UPDATE admins SET password = $1 WHERE username = $2',
        [hashedPassword, username]
      );

      console.log('Auth: Heslo úspěšně změněno');
      return true;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Auth: Chyba při změně hesla:', error);
    return false;
  }
} 