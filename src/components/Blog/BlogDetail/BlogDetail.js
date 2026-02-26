// components/BlogDetail.jsx
import React from 'react';
import Image from 'next/image';
import RelatedBlogs from './RelatedBlogs';
import blogimage from '../../../assets/blog/bd1.jpg';

function Pagination() {
  return (
    <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
      <button
        type="button"
        className="px-2 py-1 text-slate-400 hover:text-slate-600"
      >
        &lt; Page 1
      </button>
      <span className="text-slate-300">|</span>
      <button type="button" className="px-2 py-1 font-medium text-slate-700">
        Page 2
      </button>
      <span className="text-slate-300">|</span>
      <button
        type="button"
        className="px-2 py-1 text-slate-400 hover:text-slate-600"
      >
        Page 3 &gt;
      </button>
    </div>
  );
}

function BlogDetail() {
  return (
    <section className="w-full bg-[#EEF3F9] py-10 md:py-14">
      <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
          {/* Main article */}
          <article className="min-w-0 rounded-2xl bg-[#E7EEF6] p-6 md:p-8 ring-1 ring-slate-200/60">
            <h1 className="text-[34px] leading-[1.05] font-medium text-[#2F6FB3] md:text-[44px]">
              Corporate Boardrooms are no longer just an image building tool
            </h1>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Corporate Boardrooms are no longer just an image building tool for
              large multi-national organisations. Over the last decade they have
              evolved into the hub for most strategic, operational and tactical
              decision making within organisations and are powered by a whole
              new generation of tools for presentations and smooth sharing of
              content.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              The modern boardroom &amp; conference room design features
              high-resolution displays of up to 4K for improved image clarity
              resulting in crisper more engaging presentations. This means that
              communicating finer details like intricate graphs, detailed
              spreadsheets and high-definition photographs etc., is simpler than
              ever before. These displays can also be touch sensitive, which
              allows information to be annotated to convey ideas in a more
              dynamic and precise way.
            </p>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Corporate Boardrooms are no longer just an image building tool for
              large multi-national organisations. Over the last decade they have
              evolved into the hub for most strategic, operational and tactical
              decision making within organisations and are powered by a whole
              new generation of tools for presentations and smooth sharing of
              content.
            </p>

            {/* Image + Quote block */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl bg-slate-200">
                <div className="aspect-[16/10]" />
                <Image
                  src={blogimage}
                  alt="Boardroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="relative rounded-xl bg-[#BFD3E7] p-6 md:p-7">
                <div className="text-6xl leading-none text-[#7FA2C4]/70">“</div>
                <p className="-mt-2 text-[18px] leading-7 font-medium text-[#2F6FB3] md:text-[20px]">
                  Corporate Boardrooms are no longer just an image building tool
                  for large multi-national organisations.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Corporate Boardrooms are no longer just an image building tool for
              large multi-national organisations. Over the last decade they have
              evolved into the hub for most strategic, operational and tactical
              decision making within organisations and are powered by a whole
              new generation of tools for presentations and smooth sharing of
              content.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              The modern boardroom &amp; conference room design features
              high-resolution displays of up to 4K for improved image clarity
              resulting in crisper more engaging presentations. This means that
              communicating finer details like intricate graphs, detailed
              spreadsheets and high-definition photographs etc., is simpler than
              ever before.
            </p>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Corporate Boardrooms are no longer just an image building tool for
              large multi-national organisations. Over the last decade they have
              evolved into the hub for most strategic, operational and tactical
              decision making within organisations and are powered by a whole
              new generation of tools for presentations and smooth sharing of
              content.
            </p>

            <Pagination />

            {/* Mobile only: Related below content */}
            <div className="mt-10 lg:hidden">
              <RelatedBlogs />
            </div>
          </article>

          <div className="hidden lg:block min-w-0">
            <aside className="sticky top-48">
              <RelatedBlogs />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
