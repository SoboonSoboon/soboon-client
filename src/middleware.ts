import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/mypage', '/shopping/register', '/sharing/register'];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !accessToken) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('alert', 'login_required');
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
