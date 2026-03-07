// src/app/components/HeaderToggle.js
"use client";

import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

export default function HeaderToggle() {
    const pathname = usePathname();
    // Hide Header on any admin route (paths starting with /admin)
    const isAdmin = pathname?.startsWith('/admin');
    return isAdmin ? null : <Header />;
}
