import React from "react";
import Image from "next/image";
import Link from "next/link";
import b1 from "../../assets/blog/b1.jpg";
import b2 from "../../assets/blog/b2.jpg";
import b3 from "../../assets/blog/b3.jpg";
import b4 from "../../assets/blog/b4.jpg";
import b5 from "../../assets/blog/b5.jpg";
import b6 from "../../assets/blog/b6.jpg";
import b7 from "../../assets/blog/b7.jpg";
import b8 from "../../assets/blog/b8.jpg";
import b9 from "../../assets/blog/b9.jpg";

const POSTS = [
    {
        id: 1,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b1,
        href: "/blog-detail",
    },
    {
        id: 2,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b2,
        href: "/blog-detail",
    },
    {
        id: 3,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b3,
        href: "/blog-detail",
    },
    {
        id: 4,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b4,
        href: "/blog-detail",
    },
    {
        id: 5,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b5,
        href: "/blog-detail",
    },
    {
        id: 6,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b6,
        href: "/blog-detail",
    },
    {
        id: 7,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b7,
        href: "/blog-detail",
    },
    {
        id: 8,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b8,
        href: "/blog-detail",
    },
    {
        id: 9,
        title: "Corporate Boardrooms are no longer just an image building tool",
        date: "Sep",
        excerpt:
            "Corporate Boardrooms are no longer just an image building tool for large multi-national organisations. Over the last decade",
        image: b9,
        href: "/blog-detail",
    },
];

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function BlogCard({ post }) {
    return (
        <Link
            href={post.href}
            prefetch={true}
            className={cn(
                "group block rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
                "ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]"
            )}
        >
            {/* Image */}
            <div className="p-4">
                <div className="relative w-full overflow-hidden rounded-xl bg-slate-200/70">
                    <div className="aspect-[16/9]" />
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            priority={post.id <= 3}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-300/70" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
                <h3 className="text-[22px] leading-[1.15] font-medium text-[#2F6FB3] group-hover:text-[#245b95]">
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

function Pagination() {
    return (
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
            <button type="button" className="px-2 py-1 text-slate-400 hover:text-slate-600">
                &lt; Page 1
            </button>
            <span className="text-slate-300">|</span>
            <button type="button" className="px-2 py-1 font-medium text-slate-700">
                Page 2
            </button>
            <span className="text-slate-300">|</span>
            <button type="button" className="px-2 py-1 text-slate-400 hover:text-slate-600">
                Page 3 &gt;
            </button>
        </div>
    );
}

function BlogGrid() {
    return (
        <section className="w-full bg-[#EEF3F9] py-10 md:py-14">
            <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {POSTS.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                <Pagination />
            </div>
        </section>
    );
}

export default BlogGrid;