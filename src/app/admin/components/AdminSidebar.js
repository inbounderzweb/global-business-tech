"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/products" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Enquiries", href: "/admin/enquiries" },
];

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/30 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
            />

            <aside
                className={[
                    "fixed inset-y-0 left-0 z-40 w-[280px] border-r border-slate-200 bg-white",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0", // always visible on desktop
                ].join(" ")}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between lg:hidden mb-6">
                        <span className="text-sm font-semibold text-slate-500">Menu</span>
                        <button
                            onClick={onClose}
                            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-[#0B1F3A] to-[#1D4ED8] shadow-sm flex items-center justify-center">
                            <div className="h-5 w-5 rounded-lg bg-white/40" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Admin Portal</p>
                            <p className="text-base font-semibold text-slate-900">Your Website</p>
                        </div>
                    </div>

                    <nav className="mt-8 space-y-2">
                        {sections.map((sec) => {
                            const active = pathname === sec.href;
                            return (
                                <Link
                                    key={sec.href}
                                    href={sec.href}
                                    className={[
                                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                                        active
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-700 hover:bg-slate-100",
                                    ].join(" ")}
                                >
                                    <span>{sec.name}</span>
                                    {active && <span className="h-2 w-2 rounded-full bg-white/90" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold text-slate-900">Tip</p>
                        <p className="mt-1 text-xs text-slate-600">
                            Replace dummy API endpoints later—UI will stay same.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}