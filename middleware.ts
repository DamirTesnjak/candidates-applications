import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default createMiddleware(routing);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const path = request.nextUrl.pathname;
  const locale = cookieStore.get('NEXT_LOCALE')?.value;

  const isPublicPath =
    path === `/${locale}/login` || path === `/${locale}/register` || path === `/${locale}/verifyemail`;

  const token = cookieStore.get('token')?.value || '';

  if (isPublicPath && token.length > 0) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/(en|sl|hr)/',
    '/(en|sl|hr)/candidates',
    '/(en|sl|hr)/createCandidate',
    '/(en|sl|hr)/hrUserProfile',
    '/(en|sl|hr)/verifyemail',
    '/(en|sl|hr)/settings',
  ],
};
