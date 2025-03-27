import { NextResponse } from 'next/server';
import { validateCredentials } from '../auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login: Pokus o přihlášení uživatele:', username);
    const isValid = await validateCredentials(username, password);

    if (isValid) {
      console.log('Login: Přihlášení úspěšné');
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