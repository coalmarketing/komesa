import { NextResponse } from 'next/server';
import { validateCredentials, generateToken } from '../auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login: Pokus o přihlášení uživatele:', username);
    const isValid = await validateCredentials(username, password);

    if (isValid) {
      console.log('Login: Přihlášení úspěšné');
      const token = generateToken();
      
      // Nastavíme token do HTTP-only cookies
      const cookieStore = cookies();
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60 // 24 hodin
      });

      return NextResponse.json({ success: true });
    }

    console.log('Login: Neúspěšné přihlášení - nesprávné přihlašovací údaje');
    return NextResponse.json(
      { error: 'Nesprávné přihlašovací údaje' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login: Chyba při přihlášení:', error);
    return NextResponse.json(
      { error: 'Chyba při přihlášení' },
      { status: 500 }
    );
  }
} 