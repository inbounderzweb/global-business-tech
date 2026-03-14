'use client';

import React from 'react';
import Image from 'next/image';
// Note: Using actual banner image from assets
import bannerImg from '../../../assets/banner/productdetailbg.jpg';

export default function BlogDetailBanner({ title }) {
  return (
    <section className="w-full bg-[#EEF3F8] pt-32 pb-6 md:pt-44 md:pb-10">
      <div className="mx-auto w-[98%] lg:w-[90%] px-4">
        <div
          className="
            relative w-full overflow-hidden
            rounded-[26px] md:rounded-[40px]
            h-[220px] sm:h-[260px] md:h-[320px]
            shadow-xl
          "
        >
          {/* BG Image */}
          <Image
            src={bannerImg}
            alt="Blog Banner"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-white max-w-4xl drop-shadow-lg leading-tight">
              {title}
            </h1>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
