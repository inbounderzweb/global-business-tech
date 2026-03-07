// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect routes under /admin (except the login page)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const adminAuth = request.cookies.get('adminAuth');
        // adminAuth is a Cookie object; check its value
        if (!adminAuth?.value || adminAuth.value !== 'true') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}
