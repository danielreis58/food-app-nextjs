import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/forgot-password', whenAuthenticated: 'redirect' },
  { path: '/reset-password', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_WHEN_UNAUTHENTICATED = '/sign-in';

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);

  const authToken = request.cookies.get('token');

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_UNAUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // Checking if JWT token is valid
    // If the token is invalid, redirect to sign-in page
    // If the token is valid, allow the request to continue
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
