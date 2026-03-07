// src/app/api/admin/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        // Simple hard‑coded credentials (replace with real auth in production)
        if (username === 'admin' && password === 'password123') {
            const response = NextResponse.json({ message: 'Login successful' });
            // Set a httpOnly cookie to keep the session
            response.cookies.set('adminAuth', 'true', {
                httpOnly: true,
                path: '/admin/dashboard',
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });
            return response;
        }
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }
}
