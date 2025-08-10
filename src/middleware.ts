import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('Middleware request:', request.nextUrl.pathname);
  
  return createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localePrefix: 'always'
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};