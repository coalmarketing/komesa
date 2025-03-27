import { NextResponse } from 'next/server';
import { changePassword } from '../auth';

export async function POST(request: Request) {
  try {
    console.log('Change-password: Začátek změny hesla');
    const { currentPassword, newPassword } = await request.json();
    console.log('Change-password: Získány nové údaje');

    if (!currentPassword || !newPassword) {
      console.log('Change-password: Chybí povinné údaje');
      return NextResponse.json(
        { error: 'Chybí povinné údaje' },
        { status: 400 }
      );
    }

    // Zatím hardcoded username, protože nemáme session
    const username = 'admin';
    const success = await changePassword(username, currentPassword, newPassword);

    if (success) {
      console.log('Change-password: Heslo úspěšně změněno');
      return NextResponse.json({ success: true });
    }

    console.log('Change-password: Neúspěšná změna hesla - nesprávné aktuální heslo');
    return NextResponse.json(
      { error: 'Nesprávné aktuální heslo' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Change-password: Chyba při změně hesla:', error);
    return NextResponse.json(
      { error: 'Chyba při změně hesla' },
      { status: 500 }
    );
  }
} 