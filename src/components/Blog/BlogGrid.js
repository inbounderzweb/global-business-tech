'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BlogCard({ post }) {
  // Format date if needed
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link
      href={`/blog/${post.id}`}
      prefetch={true}
      className={cn(
        'group block rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]',
        'ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]'
      )}
    >
      {/* Image */}
      <div className="p-4">
        <div className="relative w-full overflow-hidden rounded-xl bg-slate-200/70">
          <div className="aspect-video" />
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-300/70 flex items-center justify-center text-slate-400 text-xs font-medium">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        <h3 className="text-[20px] leading-[1.2] font-medium text-[#2F6FB3] group-hover:text-[#245b95] line-clamp-2">
          {post.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
          <span>{post.author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <p className="mt-2 text-[13px] leading-5 text-slate-600 line-clamp-3">
          {post.shortDescription || (post.description ? post.description.substring(0, 100) + '...' : '')}
        </p>
      </div>
    </Link>
  );
}

function Pagination() {
  return (
    <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
      <button
        type="button"
        className="px-2 py-1 text-slate-400 hover:text-slate-600"
      >
        &lt; Previous
      </button>
      <span className="text-slate-300">|</span>
      <button type="button" className="px-2 py-1 font-medium text-slate-700">
        1
      </button>
      <span className="text-slate-300">|</span>
      <button
        type="button"
        className="px-2 py-1 text-slate-400 hover:text-slate-600"
      >
        Next &gt;
      </button>
    </div>
  );
}

function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#2F6FB3] border-t-transparent"></div>
        <p className="mt-4 text-slate-500 font-medium">Fetching the latest stories...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        No blog posts found. Check back later!
      </div>
    );
  }

  return (
    <section className="w-full bg-[#EEF3F9] py-10 md:py-14">
      <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {blogs.length > 9 && <Pagination />}
      </div>
    </section>
  );
}

export default BlogGrid;
