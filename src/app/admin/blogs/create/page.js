// src/app/admin/blogs/create/page.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = {
            title,
            description,
            author,
        };

        try {
            setLoading(true);
            const res = await fetch("/api/admin/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Could not publish blog post");

            router.push("/admin/blogs");
            router.refresh();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Draft New Blog Article</h1>
                <p className="mt-2 text-slate-600 font-light">Share insights, news, or updates with your audience.</p>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 sm:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a catchy title..."
                            className="w-full text-base sm:text-lg rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Author Name</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="e.g. Inbounderz Team"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Article Content</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write your article content here (Markdown or Rich Text supported in future updates)..."
                            className="w-full h-80 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none leading-relaxed"
                            required
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 rounded-3xl py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 ${loading ? 'bg-slate-700' : 'bg-slate-900'}`}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            "Publish Article"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}