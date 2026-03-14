'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function RelatedCard({ post }) {
  const formattedDate = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
  });

  return (
    <Link
      href={`/blog/${post.id}`}
      className={cn(
        'group block rounded-[24px] bg-white p-4',
        'shadow-[0_15px_40px_rgba(47,111,179,0.06)] ring-1 ring-[#2F6FB3]/10',
        'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(47,111,179,0.12)]'
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 45vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200" />
        )}
      </div>

      <div className="mt-5 px-1 pb-2">
        <h3 className="text-[18px] md:text-[20px] leading-[1.2] font-medium text-[#2F6FB3] group-hover:text-[#245b95] line-clamp-2 tracking-tight">
          {post.title}
        </h3>

        <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {formattedDate}
        </div>

        <p className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
          {post.shortDescription || (post.description ? post.description.substring(0, 80) + '...' : '')}
        </p>
      </div>
    </Link>
  );
}

function RelatedBlogs({ title = 'Related Posts' }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlogs(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="mb-6 text-[26px] font-bold text-[#333] tracking-tight">{title}</h2>

      <div className="flex flex-col gap-8">
        {blogs.map((p) => (
          <RelatedCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default RelatedBlogs;
