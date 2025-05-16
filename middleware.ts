import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware: Kontrola cesty:', request.nextUrl.pathname);
  console.log('Middleware: Doména:', request.nextUrl.host);

  // Povolíme přihlašovací endpoint bez autentizace
  if (request.nextUrl.pathname === '/api/admin/login') {
    console.log('Middleware: Povoluji přístup k přihlašovacímu endpointu');
    return NextResponse.next();
  }

  // Pro ostatní admin routy zkontrolujeme autentizaci
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware: Povoluji přístup k admin stránce');
    return NextResponse.next();
  }

  // Seznam chráněných cest
  const protectedPaths = [
    '/api/admin/references',
    '/api/admin/approve-reference',
    '/api/admin/change-password'
  ];
  
  // Kontrola, zda je cesta chráněná
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    console.log('Middleware: Kontrola chráněné cesty');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}; 