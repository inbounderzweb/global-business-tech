// src/app/admin/dashboard/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        products: 0,
        enquiries: 0,
        blogs: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, eRes, bRes] = await Promise.all([
                    fetch("/api/admin/products"),
                    fetch("/api/admin/enquiries"),
                    fetch("/api/admin/blogs")
                ]);
                const [products, enquiries, blogs] = await Promise.all([
                    pRes.json(),
                    eRes.json(),
                    bRes.json()
                ]);
                setStats({
                    products: Array.isArray(products) ? products.length : 0,
                    enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
                    blogs: Array.isArray(blogs) ? blogs.length : 0
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("adminAuth");
        }
        router.push("/admin/login");
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Enterprise Overview</h1>
            <p className="text-slate-500 mb-10 font-medium">Real-time metrics from your connected VPS server.</p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="All Products" value={stats.products} color="blue" description="Items in catalog" />
                <StatCard title="Active Blogs" value={stats.blogs} color="amber" description="Published articles" />
                <StatCard title="New Enquiries" value={stats.enquiries} color="emerald" description="Customer messages" />
            </div>

            <div className="mt-16 p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Account Management</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-sm">Securely sign out of your session. Ensure you have saved all draft changes.</p>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 px-8 py-3 text-sm font-bold text-white transition-all backdrop-blur-sm border border-white/10"
                    >
                        Secure Logout
                    </button>
                </div>
                {/* Decorative circle */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

function StatCard({ title, value, color, description }) {
    const colors = {
        blue: "bg-blue-50/50 text-blue-700 border-blue-100/50",
        amber: "bg-amber-50/50 text-amber-700 border-amber-100/50",
        emerald: "bg-emerald-50/50 text-emerald-700 border-emerald-100/50"
    };
    return (
        <div className={`p-8 rounded-[40px] border shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg ${colors[color]}`}>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{title}</p>
            <p className="text-5xl font-black mb-2">{value}</p>
            <p className="text-xs font-semibold opacity-50">{description}</p>
        </div>
    );
}
