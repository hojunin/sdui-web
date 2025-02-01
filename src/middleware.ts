import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 공개 경로 정의
  const publicPaths = ['/auth/login', '/auth/register'];

  // 현재 경로가 공개 경로인지 확인
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // 사용자 인증 상태 확인
  const isAuthenticated = request.cookies.has('user');

  // 인증된 사용자가 로그인/회원가입 페이지에 접근하려는 경우
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 인증되지 않은 사용자가 보호된 경로에 접근하려는 경우
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
