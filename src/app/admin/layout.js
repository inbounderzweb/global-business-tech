"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function Layout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar when route changes (nice UX on mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Don’t show admin chrome on login
    if (pathname === "/admin/login") return <>{children}</>;

    return (
        <div className="min-h-screen bg-linear-to-tr from-slate-50 via-white to-[#D5E7F7]/30">
            {/* Sidebar drawer (mobile) + static space (desktop) */}
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Content area:
          On desktop, push content right by sidebar width */}
            <div className="lg:pl-[280px]">
                <AdminTopbar onMenuToggle={() => setSidebarOpen((v) => !v)} />

                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}