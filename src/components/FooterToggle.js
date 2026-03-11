// src/components/FooterToggle.js
"use client";

import { usePathname } from 'next/navigation';
import FooterSection from '@/components/FooterSection';
import DiscussWithUsSection from '@/components/HomeComponents/DiscussWithUsSection';

export default function FooterToggle() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    // Hide footer and discuss section on admin routes
    if (isAdmin) return null;

    return (
        <>
            <DiscussWithUsSection />
            <FooterSection />
        </>
    );
}
