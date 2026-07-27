"use client";

import { usePathname, useRouter } from "next/navigation";

const titleMap = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Products",
    "/admin/blogs": "Blogs",
    "/admin/orders": "Orders",
    "/admin/categories": "Categories",
    "/admin/brands": "Brands",
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
        <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/70 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-5">
                    <button
                        onClick={onMenuToggle}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-100 bg-white text-[#356DA4] shadow-sm hover:scale-105 transition-transform lg:hidden"
                        aria-label="Open menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M4 7h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M4 12h11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M4 17h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-[#7FA1C4] uppercase tracking-[0.2em]">Management</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-black text-[#7FA1C4] uppercase tracking-[0.2em]">{titleMap[pathname] || "Core"}</span>
                        </div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">
                            {titleMap[pathname] || "Admin Console"}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-2 rounded-[18px] bg-linear-to-r from-red-500 to-red-600 px-6 py-2.5 text-xs font-black text-white shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <span>Terminate Session</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}