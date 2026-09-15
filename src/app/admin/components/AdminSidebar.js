"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.svg";

const sections = [
    { name: "Dashboard", href: "/admin/dashboard", key: "dashboard" },
    { name: "Products", href: "/admin/products", key: "products" },
    { name: "Blogs", href: "/admin/blogs", key: "blogs" },
    { name: "Orders", href: "/admin/orders", key: "orders" },
    { name: "Categories", href: "/admin/categories", key: "categories" },
    { name: "Brands", href: "/admin/brands", key: "brands" },
    { name: "Enquiries", href: "/admin/enquiries", key: "enquiries" },
];

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (data && !data.error) setStats(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-[#0B1F3A]/40 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
            />

            <aside
                className={[
                    "fixed inset-y-0 left-0 z-40 w-[280px] border-r border-slate-100 bg-linear-to-b from-white to-[#F8FAFC]",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0 shadow-2xl lg:shadow-none",
                ].join(" ")}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between lg:hidden mb-10">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Navigation</span>
                        <button
                            onClick={onClose}
                            className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white text-[#356DA4] shadow-sm border border-slate-100 hover:scale-110 transition-transform"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 mb-12 overflow-hidden">
                        <Link href="/" className="px-2 block transform hover:scale-105 transition-transform duration-300">
                            <Image src={logo} alt="GB TECH Logo" className="w-[190px] h-auto" priority />
                        </Link>
                        <div className="px-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black text-[#356DA4] uppercase tracking-wider border border-blue-100/50 shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#356DA4] animate-pulse" />
                                Admin Console
                            </span>
                        </div>
                    </div>

                    <nav className="space-y-2 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        {sections.map((sec) => {
                            const active = pathname === sec.href;
                            let count = 0;
                            if (sec.key === 'enquiries') count = stats.pendingEnquiries;
                            if (sec.key === 'orders') count = stats.pendingOrders;

                            return (
                                <Link
                                    key={sec.href}
                                    href={sec.href}
                                    className={[
                                        "flex items-center justify-between rounded-[20px] px-5 py-3.5 text-sm font-bold transition-all duration-300 group",
                                        active
                                            ? "bg-[#356DA4] text-white shadow-lg shadow-blue-900/10 translate-x-1"
                                            : "text-slate-500 hover:bg-white hover:text-[#356DA4] hover:shadow-xs hover:translate-x-1",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-3">
                                        <span>{sec.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {count > 0 && (
                                            <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-black shadow-sm ring-2 ${active ? 'bg-white text-[#356DA4] ring-[#356DA4]' : 'bg-[#356DA4] text-white ring-white'}`}>
                                                {count}
                                            </span>
                                        )}
                                        {active && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs animate-in zoom-in" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <div className="rounded-[28px] bg-linear-to-br from-[#EBF5FF] to-[#D5E7F7] p-5 relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-[#356DA4] uppercase tracking-widest">Global Reach</p>
                                <p className="mt-1 text-[11px] font-bold text-[#2C5C8F]/80 leading-tight">Your VPS infrastructure is currently serving global traffic.</p>
                            </div>
                            <div className="absolute -right-6 -bottom-6 h-20 w-20 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}