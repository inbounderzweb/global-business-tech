// src/app/admin/blogs/edit/[id]/page.js
"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form states
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setSubmitting(true);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setImage(data.url);
                setError("");
            } else {
                setError(data.error || "Upload failed");
            }
        } catch (err) {
            setError("Upload failed");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/admin/blogs/${params.id}`);
                if (!res.ok) throw new Error("Blog not found");
                const data = await res.json();
                setTitle(data.title);
                setShortDescription(data.shortDescription || "");
                setDescription(data.description);
                setImage(data.image || "");
                setAuthor(data.author);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = {
            title,
            shortDescription,
            description,
            image,
            author,
        };

        try {
            setSubmitting(true);
            const res = await fetch(`/api/admin/blogs/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Could not update blog post");

            router.push("/admin/blogs");
            router.refresh();
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Blog Article</h1>
                <p className="mt-2 text-slate-600 font-light">Refine your content and update your audience.</p>
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
                    <div className="md:col-span-1">
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

                    {/* Featured Image Upload */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Featured Image</label>
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />
                            <div className={`w-full h-[60px] rounded-2xl border-2 border-dashed transition-all flex items-center justify-center gap-2 px-5 ${image ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
                                <svg className={`w-5 h-5 ${image ? 'text-green-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className={`text-sm font-medium ${image ? 'text-green-600' : 'text-slate-500'}`}>
                                    {image ? "Change Image" : "Click to upload image"}
                                </span>
                            </div>
                        </div>
                        {image && (
                            <div className="mt-3 relative w-full h-40 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImage("")}
                                    className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full text-red-500 shadow-sm hover:bg-white"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Short Description (for list view)</label>
                        <textarea
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            placeholder="A brief summary of the article..."
                            className="w-full h-24 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none leading-relaxed"
                        />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Article Content</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write your article content here..."
                            className="w-full h-80 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none leading-relaxed"
                            required
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full flex items-center justify-center gap-2 rounded-3xl py-5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 ${submitting ? 'bg-slate-700' : 'bg-slate-900'}`}
                    >
                        {submitting ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full mt-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
