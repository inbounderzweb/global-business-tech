// components/RelatedBlogs.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import relatedimg from '../../../assets/blog/b1.jpg';
import relatedimg1 from '../../../assets/blog/b2.jpg';
import relatedimg2 from '../../../assets/blog/b3.jpg';

const RELATED = [
  {
    id: 1,
    title: 'Corporate Boardrooms are no longer just an image building tool',
    date: 'Sep',
    excerpt:
      'Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade',
    image: relatedimg,
    href: '/blog/corporate-boardrooms-1',
  },
  {
    id: 2,
    title: 'Corporate Boardrooms are no longer just an image building tool',
    date: 'Sep',
    excerpt:
      'Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade',
    image: relatedimg1,
    href: '/blog/corporate-boardrooms-2',
  },
  {
    id: 3,
    title: 'Corporate Boardrooms are no longer just an image building tool',
    date: 'Sep',
    excerpt:
      'Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade',
    image: relatedimg2,
    href: '/blog/corporate-boardrooms-3',
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function RelatedCard({ post }) {
  return (
    <Link
      href={post.href}
      className={cn(
        'group block rounded-2xl bg-white',
        'shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70',
        'transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]'
      )}
    >
      <div className="p-4">
        <div className="relative w-full overflow-hidden rounded-xl bg-slate-200/70">
          <div className="aspect-[16/9]" />
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 28vw"
          />
        </div>
      </div>

      <div className="px-5 pb-5">
        <h3 className="text-[20px] leading-[1.15] font-medium text-[#2F6FB3] group-hover:text-[#245b95]">
          {post.title}
        </h3>

        <p className="mt-3 text-xs text-slate-400">{post.date}</p>

        <p className="mt-2 text-[13px] leading-5 text-slate-600">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

function RelatedBlogs({ title = 'Related Posts', items = RELATED }) {
  return (
    <aside className="w-full">
      <h2 className="mb-3 text-lg font-semibold text-slate-700">{title}</h2>

      {/* Desktop: stacked cards + scroll if long */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-6 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
          {items.map((p) => (
            <RelatedCard key={p.id} post={p} />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: clean slider */}
      <div className="lg:hidden">
        {/* IMPORTANT: keep overflow contained to this container */}
        <div className="overflow-hidden">
          <div
            className={cn(
              'flex gap-4 overflow-x-auto pb-3',
              'snap-x snap-mandatory scroll-smooth',
              '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            )}
          >
            {items.map((p) => (
              <div
                key={p.id}
                className={cn(
                  'snap-start',
                  'shrink-0',
                  'w-[86%] sm:w-[60%]' // clean widths
                )}
              >
                <RelatedCard post={p} />
              </div>
            ))}

            {/* right padding so last card doesn't stick to edge */}
            <div className="shrink-0 w-4" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RelatedBlogs;
