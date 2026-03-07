// src/components/HeaderToggle.js
"use client";

import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

export default function HeaderToggle() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    // Render Header only on non-admin routes
    return isAdmin ? null : <Header />;
}
