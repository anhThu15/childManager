import { NextResponse } from 'next/server';

export function middleware(request) {
  const user = request.cookies.get('user');

  if (!user) {
    return NextResponse.redirect(new URL('/choice', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!choice|login|child/login).*)'],
};
