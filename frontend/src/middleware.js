import { NextResponse } from 'next/server';

export function middleware(request) {
  const user = request.cookies.get('user');
  const url = request.nextUrl.pathname;

  const allowedUnauthenticatedPaths = ['/choice', '/login', '/sigin', '/students/login', '/students/sigin'];

  
  if (!user) {
    if (!allowedUnauthenticatedPaths.includes(url)) {
      return NextResponse.redirect(new URL('/choice', request.url));
    }
  } else {
    if (url.startsWith('/students')) {
      return NextResponse.next();
    } else if (url.includes('/students')) {
      return NextResponse.redirect(new URL('/students/restricted', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static).*)'], 
};
