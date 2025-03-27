import { sign, verify } from 'jsonwebtoken';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

// Zajistíme, že JWT_SECRET je vždy definován
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET není definován v .env.local');
}

const JWT_SECRET = process.env.JWT_SECRET;

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
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT password FROM admins WHERE username = ?',
        [username]
      );

      const admin = (rows as any[])[0] as { password: string };
      if (!admin) {
        console.log('Auth: Uživatel nenalezen');
        return false;
      }

      const isValid = await bcrypt.compare(password, admin.password);
      console.log('Auth: Výsledek validace:', isValid);
      return isValid;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Auth: Chyba při validaci credentials:', error);
    return false;
  }
}

export async function changePassword(username: string, currentPassword: string, newPassword: string): Promise<boolean> {
  console.log('Auth: Změna hesla pro uživatele:', username);
  
  try {
    const connection = await pool.getConnection();
    try {
      // Nejprve ověříme aktuální heslo
      const [rows] = await connection.execute(
        'SELECT password FROM admins WHERE username = ?',
        [username]
      );

      const admin = (rows as any[])[0] as { password: string };
      if (!admin) {
        console.log('Auth: Uživatel nenalezen');
        return false;
      }

      const isValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isValid) {
        console.log('Auth: Nesprávné aktuální heslo');
        return false;
      }

      // Pokud je heslo správné, aktualizujeme ho
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await connection.execute(
        'UPDATE admins SET password = ? WHERE username = ?',
        [hashedPassword, username]
      );

      console.log('Auth: Heslo úspěšně změněno');
      return true;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Auth: Chyba při změně hesla:', error);
    return false;
  }
} 