import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/register' || path === '/verifyemail';

    const token = cookieStore.get('token')?.value || ''

    if(isPublicPath && token.length > 0) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        //'/',
        //'/createCandidate',
        //'/hrUserProfile',
        //'/login',
        //'/register',
        //'/verifyemail',
        //'/settings',
    ],
}