// ============================
// SimplePageBanner.jsx
// ============================
"use client";

import React from "react";
import Image from "next/image";

// ✅ Replace with your exported Figma banner image
import aboutBanner from "../../assets/banner/productdetailbg.jpg";

export default function Banner() {
  return (
    <section className="w-full bg-[#EEF3F8] py-10 md:py-12 mt-16 md:mt-40">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div
          className="
            relative w-full overflow-hidden
            rounded-[26px] md:rounded-[28px]
            h-[210px] sm:h-[240px] md:h-[280px]
          "
        >
          {/* BG Image */}
          <Image
            src={aboutBanner}
            alt="About banner"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Blue overlay like screenshot */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-white font-semibold text-[28px] md:text-[34px] leading-tight">
                Product details
              </h1>
              <p className="mt-1 text-white/85 text-[12px] md:text-[14px] tracking-[0.08em] uppercase">
                Learn about our business philosphy
              </p>
            </div>
          </div>

          {/* Optional subtle top shine (gives same soft depth) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
