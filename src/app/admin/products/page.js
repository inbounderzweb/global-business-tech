// src/app/admin/products/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        fetch("/api/admin/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Failed to delete product");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Products Catalog</h1>
                    <p className="text-slate-500 font-light mt-1 text-sm sm:text-base">List and manage your product inventory and specifications.</p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 border border-slate-900 px-8 py-3 text-sm font-bold text-white shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    Add New Product
                </Link>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
                                            <p className="text-slate-400 font-medium tracking-wide italic">Fetching products...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length > 0 ? products.map((p) => (
                                <tr key={p.id} className="group hover:bg-slate-50/40 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                {p.thumbnail || p.mainImage ? (
                                                    <img
                                                        src={p.thumbnail || p.mainImage}
                                                        alt={p.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(p.name) + "&background=F1F5F9&color=64748B";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-base">{p.name || "Untitled"}</h3>
                                                <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 max-w-[200px]">{p.description || "No description provided."}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 ring-1 ring-inset ring-blue-600/10">
                                            {p.category?.name || "Global"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-extrabold text-slate-900 text-lg">₹{p.price || 0}</span>
                                            {p.variants?.length > 0 && (
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                                                    +{p.variants.length} Variants
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-5 bg-slate-50 rounded-full text-slate-300">
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-slate-900">Catalogue is Empty</h3>
                                                <p className="text-slate-400 text-sm">Start building your store by adding your first product.</p>
                                            </div>
                                            <Link
                                                href="/admin/products/create"
                                                className="mt-2 text-sm font-bold text-blue-600 hover:underline"
                                            >
                                                Create Product Now &rarr;
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
