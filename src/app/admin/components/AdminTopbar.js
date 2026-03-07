"use client";

import { usePathname, useRouter } from "next/navigation";

const titleMap = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Products",
    "/admin/blogs": "Blogs",
    "/admin/orders": "Orders",
    "/admin/categories": "Categories",
    "/admin/customers": "Customers",
};

export default function AdminTopbar({ onMenuToggle }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("adminAuth");
            document.cookie = "adminAuth=; path=/; max-age=0; SameSite=Lax";
        }
        router.push("/admin/login");
    };

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    {/* Hamburger on mobile */}
                    <button
                        onClick={onMenuToggle}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
                        aria-label="Open menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div>
                        <p className="text-xs text-slate-500">Admin Panel</p>
                        <h1 className="text-lg font-semibold text-slate-900">
                            {titleMap[pathname] || "Admin"}
                        </h1>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}