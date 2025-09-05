import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock authentication check - will be replaced with real auth later
function isAuthenticated(request: NextRequest): boolean {
  // For now, check if there's an auth token in localStorage (this is just a mock)
  // In a real app, you'd validate a JWT token or session
  return request.cookies.has('auth-token') || request.cookies.has('next-auth.session-token');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/transactions', '/budget', '/goals', '/profile'];
  const authRoutes = ['/auth/login', '/auth/register'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const userIsAuthenticated = isAuthenticated(request);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && userIsAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (isProtectedRoute && !userIsAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)',
  ],
};
