"use client";

import React, { useEffect, useState, use } from 'react';
import BlogDetailBanner from '@/components/Blog/BlogDetail/BlogDetailBanner';
import BlogDetail from '@/components/Blog/BlogDetail/BlogDetail';

export default function BlogDetailPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${params.id}`);
                if (!res.ok) throw new Error("Blog not found");
                const data = await res.json();
                setBlog(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [params.id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[600px] bg-[#EEF3F9]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2F6FB3] border-t-transparent"></div>
        </div>
    );

    if (!blog) return (
        <div className="flex flex-col items-center justify-center min-h-[600px] bg-[#EEF3F9] text-center px-4">
            <h1 className="text-4xl font-bold text-slate-800">404</h1>
            <p className="mt-2 text-slate-600">Blog post not found.</p>
        </div>
    );

    return (
        <div>
            <BlogDetailBanner title={blog.title} />
            <BlogDetail blog={blog} />
        </div>
    );
}
