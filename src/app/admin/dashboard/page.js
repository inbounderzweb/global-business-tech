// src/app/admin/dashboard/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        products: 0,
        enquiries: 0,
        blogs: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (data && !data.error) {
                    setStats(data);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 60000); // Pulse every minute
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("adminAuth");
        }
        router.push("/admin/login");
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#D5E7F7] text-[#356DA4] text-[10px] font-black uppercase tracking-widest border border-[#356DA4]/10 shadow-xs">Enterprise Console v2.4</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-3">
                        Operational <span className="text-[#356DA4]">Intelligence</span>
                    </h1>
                    <p className="text-slate-500 font-bold text-lg max-w-lg leading-relaxed">
                        High-fidelity monitoring and control interface for GBT global technology infrastructure.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white p-3 rounded-[28px] shadow-sm border border-slate-100">
                    <div className="px-5 py-2 text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Pulse</p>
                        <p className="text-sm font-black text-slate-900">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="h-10 w-px bg-slate-100" />
                    <div className="px-5 py-2">
                        <p className="text-[10px] font-black text-[#356DA4] uppercase tracking-widest leading-none mb-1">Node Status</p>
                        <p className="text-sm font-black text-emerald-500 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            Synchronized
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Asset Catalog"
                    value={stats.products}
                    color="blue"
                    description="Items live in inventory"
                    onClick={() => router.push("/admin/products")}
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                />
                <StatCard
                    title="Revenue Ops"
                    value={stats.orders}
                    color="indigo"
                    description="Incoming client orders"
                    onClick={() => router.push("/admin/orders")}
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                />
                <StatCard
                    title="Signal Flow"
                    value={stats.enquiries}
                    color="emerald"
                    description="Pending user enquiries"
                    onClick={() => router.push("/admin/enquiries")}
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                />
                <StatCard
                    title="Intel Feed"
                    value={stats.blogs}
                    color="amber"
                    description="Published brand articles"
                    onClick={() => router.push("/admin/blogs")}
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg>}
                />
            </div>

            <div className="mt-16 group relative lg:col-span-4 overflow-hidden rounded-[56px] border border-[#D5E7F7] bg-white p-12 shadow-2xl transition-all duration-500 hover:shadow-blue-200/50">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#356DA4] text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100/50">
                            Root Security Level
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">System <span className="text-[#356DA4]">Integrity</span> & Auditing</h3>
                        <p className="text-slate-500 text-lg font-bold leading-relaxed mb-8">
                            Your administrative session is hosted on an encrypted enterprise node. All telemetry, catalog modifications, and transactional approvals are logged for continuous audit compliance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">RSA-4096 Encrypted</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Geo-Redundant Storage</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="relative overflow-hidden group/btn inline-flex items-center justify-center rounded-[32px] bg-[#356DA4] px-14 py-8 text-xl font-black text-white transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Terminate Access
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/btn:translate-x-3 transition-transform duration-500"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                </div>

                {/* Visual Architecture */}
                <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-linear-to-br from-[#EEF3F8] to-transparent rounded-full opacity-50 blur-3xl z-0" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-linear-to-b from-[#EEF3F8] via-[#D5E7F7] to-transparent opacity-30" />
            </div>
        </div>
    );
}

function StatCard({ title, value, color, description, onClick, icon }) {
    const cardColors = {
        blue: "text-[#356DA4] hover:border-[#356DA4]/30",
        indigo: "text-indigo-600 hover:border-indigo-200",
        amber: "text-amber-600 hover:border-amber-200",
        emerald: "text-emerald-600 hover:border-emerald-200"
    };

    return (
        <div
            onClick={onClick}
            className={`group relative p-10 rounded-[56px] bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer active:scale-95 overflow-hidden ${cardColors[color]}`}
        >
            <div className="relative z-10 flex justify-between items-start mb-10">
                <div className={`p-5 rounded-[28px] bg-white shadow-xl shadow-current/10 border border-slate-50 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ${cardColors[color]}`}>
                    {icon}
                </div>
                <div className="mt-1 flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-40 mb-1 leading-none">{title}</p>
                    <div className="h-1 w-12 rounded-full bg-current opacity-20" />
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-7xl font-black mb-4 tracking-tighter text-slate-900 group-hover:text-current transition-all duration-500">{value}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-400 opacity-80 group-hover:opacity-100 transition-all duration-500">{description}</p>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
            </div>

            {/* Architectural Grid */}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-current opacity-0 group-hover:opacity-[0.03] rounded-bl-[120px] transition-all duration-500 z-0`} />
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-current opacity-0 group-hover:opacity-10 transition-all duration-500`} />
        </div>
    );
}
