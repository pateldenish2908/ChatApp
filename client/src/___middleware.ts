import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Pages that don't need authorization
  const publicPaths = ['/login', '/register'];

  // If the request is for a public page, allow it without token check
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // For all other pages, check token
  if (!token) {
    // Redirect unauthorized user to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Token exists, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // run middleware on all paths
};
