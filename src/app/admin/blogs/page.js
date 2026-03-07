// src/app/admin/blogs/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/api/admin/blogs")
            .then((res) => res.json())
            .then(setBlogs);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Blogs</h1>
            <Link
                href="/admin/blogs/create"
                className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + Add Blog
            </Link>
            <ul className="space-y-4">
                {blogs.map((b) => (
                    <li key={b.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-semibold">{b.title}</h2>
                        <p className="text-gray-600">{b.description}</p>
                        <p className="text-sm text-gray-500">By {b.author} on {b.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
