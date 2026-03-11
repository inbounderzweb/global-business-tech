// src/app/admin/blogs/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = () => {
        setLoading(true);
        fetch("/api/admin/blogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        if (!confirm("Delete this blog post?")) return;
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setBlogs(blogs.filter(b => b.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl space-y-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Blog Repository</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage all articles and publications on your site.</p>
                </div>
                <Link
                    href="/admin/blogs/create"
                    className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-2xl hover:brightness-125 active:scale-95 transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                    Compose New
                </Link>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    <div className="py-20 text-center text-slate-400 font-bold bg-white rounded-[40px] border border-slate-50">
                        Synchronizing with server...
                    </div>
                ) : blogs.length > 0 ? blogs.map((b) => (
                    <div
                        key={b.id}
                        className="group relative overflow-hidden p-8 rounded-[40px] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                    >
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                    <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition truncate">{b.title}</h2>
                                </div>
                                <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed text-sm">{b.description}</p>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                                            {b.author?.charAt(0) || "A"}
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{b.author || "Administrator"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                        <span className="text-xs font-bold uppercase tracking-wider">{new Date(b.date || b.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </button>
                                <button
                                    onClick={() => deleteBlog(b.id)}
                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[60px] bg-slate-50/30">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm mb-6 text-slate-200">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        </div>
                        <p className="text-slate-400 font-bold text-lg">Your story starts here.</p>
                        <Link href="/admin/blogs/create" className="text-blue-500 font-bold text-sm hover:underline mt-2 inline-block">Write your first article &rarr;</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
