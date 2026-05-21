import { NextRequest, NextResponse } from 'next/server';

// [DEMO] /dividing/register를 임시로 제외 — 시연 영상 촬영 후 원복 필요
const protectedRoutes = ['/mypage', '/shopping/register' /* '/dividing/register' */];

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
