// ============================
// ProductDetailsSection.jsx
// Images handled INSIDE this component
// ============================
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ✅ Import your local images here (export from Figma and place in assets)
import p1 from "../../assets/dummyproductimages/headset.png";
import p2 from "../../assets/dummyproductimages/headset.png";
import p3 from "../../assets/dummyproductimages/headset.png";
import p4 from "../../assets/dummyproductimages/headset.png";


// ✅ Related products (use same for now; replace with your real related images)
import r1 from "../../assets/dummyproductimages/headset.png";
import r2 from "../../assets/dummyproductimages/headset.png";
import r3 from "../../assets/dummyproductimages/headset.png";
import r4 from "../../assets/dummyproductimages/headset.png";

export default function ProductDetailsSection() {
  const data = useMemo(
    () => ({
      title: "Poly Blackwire 3200",
      subtitle: "Poly Blackwire 3220 CORDED UC HEADSET",
      bullets: [
        "Keep your connectivity options open",
        "Get more done with the all-day comfort design",
        "Ramp up UC adoption thanks to fast setup",
      ],
      categories: ["Poly", "Poly Headsets"],
      tag: "Poly Blackwire 3220",
      images: [p1, p2, p3, p4],

      // ✅ Description section content
      descriptionLeftTitle: "BLACKWIRE 3200 SERIES",
      descriptionLeftText:
        "The Blackwire 3200 Series corded UC headsets are durable, lightweight, easy to deploy and come in a variety of connectivity and wearing options. Add insights from Plantronics Manager Pro, an additional service, and you’ve got a future proof solution. The Blackwire 3200 series with Plantronics signature audio provides top-notch features at a price you can afford.",

      descriptionRightTitle: "TOP FEATURES",
      descriptionRightBullets: [
        "Available in monaural (C3210/C3215) or hi-fi stereo with passive noise reduction (C3220/C3225)",
        "Variants include universal USB or USB-C",
        "Connectivity to smartphone and tablet via 3.5 mm (C3215/C3225)",
        "Intuitive inline controls to answer/end calls, control volume, and mute",
        "PC wideband audio with noise-canceling microphones for high-quality PC telephony",
        "Plantronics Manager Pro, an additional purchase, enables your IT team to gain insight into every compatible Plantronics headset being used company-wide",
      ],

      // ✅ Related products slider data
      relatedTitle: "Related Products",
      related: [
        { id: 1, badge: "Blackwire", title: "Poly Blackwire 3200", img: r1, href: "/products/poly-blackwire-3200" },
        { id: 2, badge: "Blackwire", title: "Poly Blackwire 3200", img: r2, href: "/products/poly-blackwire-3200" },
        { id: 3, badge: "Blackwire", title: "Poly Blackwire 3200", img: r3, href: "/products/poly-blackwire-3200" },
        { id: 4, badge: "Blackwire", title: "Poly Blackwire 3200", img: r4, href: "/products/poly-blackwire-3200" },
        { id: 5, badge: "Blackwire", title: "Poly Blackwire 3200", img: r1, href: "/products/poly-blackwire-3200" },
      ],
    }),
    []
  );

  const [active, setActive] = useState(0);

  // Mobile gallery carousel refs
  const scrollerRef = useRef(null);
  const slideRefs = useRef([]);

  const setActiveIndex = (idx) => {
    setActive(idx);
    const scroller = scrollerRef.current;
    const node = slideRefs.current[idx];
    if (scroller && node) {
      node.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  // Sync active index on mobile swipe
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((node, idx) => {
        if (!node) return;
        const nodeCenter = node.offsetLeft + node.clientWidth / 2;
        const dist = Math.abs(center - nodeCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActive(bestIdx);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: data.title, text: data.subtitle, url });
        return;
      }
    } catch (_) {}
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch (_) {
      if (typeof window !== "undefined") window.prompt("Copy this link:", url);
    }
  };

  return (
    <section className="w-full bg-[#EEF3F8]">
      {/* ===== TOP: GALLERY + DETAILS ===== */}
      <div className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 gap-8 items-start">
            {/* LEFT: MAIN IMAGE + THUMBS */}
            <div>
              <div className="bg-white rounded-[28px] p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="relative w-full aspect-[1/1] rounded-[22px] overflow-hidden bg-white">
                  <Image
                    src={data.images[active]}
                    alt={data.title}
                    fill
                    className="object-contain"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>
              </div>

              {/* Thumbs row (3 thumbs + 1 placeholder like screenshot) */}
              <div className="mt-6 flex gap-5">
                {data.images.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative h-[92px] w-[128px] rounded-[18px] overflow-hidden bg-white
                      ${idx === active ? "ring-2 ring-[#7EA2C6]" : "ring-0"}
                      shadow-[0_1px_0_rgba(0,0,0,0.03)]
                    `}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-contain p-3" />
                  </button>
                ))}

                <button
                  onClick={() => setActiveIndex(3)}
                  className={`h-[92px] w-[128px] rounded-[18px] bg-[#C7D7E8] ${
                    active === 3 ? "ring-2 ring-[#7EA2C6]" : ""
                  }`}
                  aria-label="Select image 4"
                />
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <DetailsCard data={data} onShare={handleShare} />
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            {/* Gallery carousel */}
            <div
              ref={scrollerRef}
              className="
                flex gap-5 overflow-x-auto snap-x snap-mandatory
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                pb-3
              "
            >
              {data.images.map((img, idx) => (
                <div
                  key={idx}
                  ref={(el) => (slideRefs.current[idx] = el)}
                  className="snap-center shrink-0 w-[86%]"
                >
                  <div className="bg-white rounded-[28px] p-6">
                    <div className="relative w-full aspect-[1/1] rounded-[22px] overflow-hidden bg-white">
                      <Image src={img} alt={data.title} fill className="object-contain" priority={idx === 0} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-2 mb-6">
              {data.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all ${idx === active ? "w-8 bg-[#356DA4]" : "w-2 bg-[#cbd5e1]"}`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            <DetailsCard data={data} onShare={handleShare} />
          </div>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="pb-8 md:pb-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
          <div className="text-center text-[#2F2F2F] font-medium mb-6">Description</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left description card */}
            <div className="bg-[#C7D7E8] rounded-[22px] p-7 md:p-8">
              <h3 className="text-[#2F2F2F] font-semibold text-[22px] md:text-[24px] mb-3">
                {data.descriptionLeftTitle}
              </h3>
              <p className="text-[#2F2F2F]/80 leading-[1.7] text-[14px] md:text-[15px]">
                {data.descriptionLeftText}
              </p>
            </div>

            {/* Right top features card */}
            <div className="bg-[#C7D7E8] rounded-[22px] p-7 md:p-8">
              <h3 className="text-[#2F2F2F] font-semibold text-[22px] md:text-[24px] mb-3">
                {data.descriptionRightTitle}
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-[#2F2F2F]/80 leading-[1.7] text-[14px] md:text-[15px]">
                {data.descriptionRightBullets.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RELATED PRODUCTS (SLIDER) ===== */}
      <div className="pb-14 md:pb-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
          <div className="text-center text-[#2F2F2F] font-medium mb-6">{data.relatedTitle}</div>
        </div>

        <RelatedProductsSlider items={data.related} />
      </div>
    </section>
  );
}

/* ============================
   Details Card (Title/Sub/Share/Pills/Categories)
============================ */
function DetailsCard({ data, onShare }) {
  return (
    <div className="bg-white rounded-[28px] p-7 md:p-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[#2E6EA5] text-[30px] md:text-[36px] font-semibold leading-tight">
            {data.title}
          </h1>
          <p className="mt-2 text-[#2F2F2F] text-[14px] md:text-[16px] font-semibold tracking-wide uppercase">
            {data.subtitle}
          </p>
        </div>

        <button
          onClick={onShare}
          className="shrink-0 w-[56px] h-[56px] rounded-[12px] bg-[#E8EFF6] flex flex-col items-center justify-center gap-1"
          aria-label="Share"
        >
          {/* icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v10" stroke="#2E6EA5" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M8 6l4-4 4 4"
              stroke="#2E6EA5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 13v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"
              stroke="#2E6EA5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[11px] text-[#2F2F2F]">Share</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mt-4 h-[2px] w-full bg-[#E3ECF5]" />

      {/* Pills */}
      <div className="mt-6 space-y-4">
        {data.bullets.map((b, i) => (
          <div
            key={i}
            className="bg-[#EDF3F9] text-[#3A3A3A] rounded-full px-6 py-4 text-[14px] md:text-[16px] w-full md:w-[80%]"
          >
            {b}
          </div>
        ))}
      </div>

      {/* Space like screenshot */}
      <div className="h-10 md:h-16" />

      {/* Categories + Tag */}
      <div className="mt-2 text-[14px] text-[#3A3A3A]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="min-w-[92px]">Categories:</span>
          {data.categories.map((c) => (
            <span key={c} className="bg-[#EDF3F9] text-[#3A3A3A] rounded-[6px] px-6 py-2">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-4 h-[2px] w-full bg-[#E3ECF5]" />

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <span className="min-w-[92px]">Tag:</span>
          <span className="bg-[#EDF3F9] text-[#3A3A3A] rounded-[6px] px-6 py-2">
            {data.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================
   Related Products Slider
   - Desktop shows multiple cards scrollable
   - Mobile shows 2 cards per row-ish like screenshot
============================ */
function RelatedProductsSlider({ items }) {
  const scrollerRef = useRef(null);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* arrows (desktop only) */}
        <button
          onClick={() => scrollByCards(-1)}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow items-center justify-center"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          onClick={() => scrollByCards(1)}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow items-center justify-center"
          aria-label="Scroll right"
        >
          →
        </button>

        <div
          ref={scrollerRef}
          className="
            mx-auto w-full max-w-[1400px] px-4 md:px-8
            flex gap-6 overflow-x-auto
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            scroll-smooth
            pb-2
          "
        >
          {items.map((p) => (
            <div
              key={p.id}
              className="
                shrink-0
                w-[76%] sm:w-[46%] md:w-[260px] lg:w-[280px]
              "
            >
              <div className="bg-white rounded-[22px] p-5">
                {/* image */}
                <div className="relative w-full aspect-[1/1] rounded-[18px] overflow-hidden bg-white">
                  <Image src={p.img} alt={p.title} fill className="object-contain" />

                  {/* small badge */}
                  <div className="absolute top-3 right-3 bg-[#E9EEF6] text-[#2F2F2F] text-[12px] px-3 py-1 rounded-[8px]">
                    {p.badge}
                  </div>
                </div>

                {/* title + button */}
                <div className="text-center mt-4">
                  <div className="text-[#2F2F2F] font-medium">{p.title}</div>

                  <Link
                    href={p.href}
                    className="inline-flex items-center justify-center mt-3 h-[40px] px-8 rounded-full bg-[#2E6EA5] text-white text-[14px]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

