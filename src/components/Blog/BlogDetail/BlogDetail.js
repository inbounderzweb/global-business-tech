'use client';

import React from 'react';
import Image from 'next/image';
import RelatedBlogs from './RelatedBlogs';

function Pagination() {
  return (
    <div className="mt-16 flex items-center justify-center gap-4 text-[13px] font-medium text-[#849DB6]">
      <button type="button" className="flex items-center gap-1 hover:text-[#2F6FB3] transition">
        &lt; Page 1
      </button>
      <span className="text-[#849DB6]/30">|</span>
      <button type="button" className="text-[#333] hover:text-[#2F6FB3] transition">
        Page 2
      </button>
      <span className="text-[#849DB6]/30">|</span>
      <button type="button" className="flex items-center gap-1 hover:text-[#2F6FB3] transition">
        Page 3 &gt;
      </button>
    </div>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-6 bottom-10 flex flex-col gap-4 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="h-10 w-10 border-2 border-[#849DB6] rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#849DB6] hover:bg-[#849DB6] hover:text-white transition cursor-pointer shadow-sm"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}

function BlogDetail({ blog }) {
  if (!blog) return null;

  // Split description into two halves for the design layout if it's long
  const descParts = blog.description.split('\n\n');
  const midPoint = Math.ceil(descParts.length / 2);
  const firstHalf = descParts.slice(0, midPoint).join('\n\n');
  const secondHalf = descParts.slice(midPoint).join('\n\n');

  return (
    <section className="w-full bg-[#EEF3F9] py-10 md:py-16 relative z-0">
      <FloatingActions />

      <div className="mx-auto w-[98%] lg:w-[94%] xl:w-[90%] px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] items-start">

          {/* Main Article Section */}
          <div className="bg-[#EBF1F7] rounded-[40px] p-8 md:p-14 shadow-sm border border-slate-100/50">

            {/* Blog Title */}
            <h2 className="text-[34px] md:text-[50px] leading-[1.05] font-medium text-[#2F6FB3] mb-8 tracking-tight">
              {blog.title}
            </h2>

            {/* Description First Part */}
            <div className="text-[15px] leading-[1.8] text-[#555] mb-10 whitespace-pre-wrap font-light">
              {firstHalf}
            </div>

            {/* Featured Image & Quote Row - Now with matched heights */}
            <div className="grid md:grid-cols-2 gap-6 mb-10 items-stretch">
              {/* Image Box */}
              <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[300px] h-full">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 animate-pulse" />
                )}
              </div>

              {/* Quote Block */}
              <div className="bg-[#BFD3EA]/70 rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group h-full">
                <div className="text-7xl font-serif text-[#A0BCD8] mb-1 select-none pointer-events-none">“</div>
                <p className="text-[19px] md:text-[24px] lg:text-[26px] leading-[1.2] font-medium text-[#2F6FB3] relative z-10 tracking-tight">
                  {blog.shortDescription || blog.title}
                </p>
                {/* Decorative Big Quote in background */}
                <div className="absolute -bottom-6 -right-4 text-[140px] font-serif text-[#A0BCD8]/20 select-none pointer-events-none">”</div>
              </div>
            </div>

            {/* Description Second Part */}
            <div className="text-[15px] leading-[1.8] text-[#555] whitespace-pre-wrap font-light">
              {secondHalf}
            </div>

            {/* Pagination Component */}
            <Pagination />
          </div>

          {/* Sidebar Section */}
          <aside className="sticky top-50 space-y-10 px-2">
            <RelatedBlogs />
          </aside>

        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
