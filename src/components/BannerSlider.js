// ============================
// BannerSlider.js
// ============================
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerSlider({ slides, autoPlay = true, interval = 5000 }) {
  const SLIDES = slides?.length ? slides : [];

  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? SLIDES.length - 1 : p - 1));
  const next = () => setActive((p) => (p === SLIDES.length - 1 ? 0 : p + 1));

  useEffect(() => {
    if (!autoPlay || SLIDES.length <= 1) return;
    const t = setInterval(() => {
      setActive((p) => (p === SLIDES.length - 1 ? 0 : p + 1));
    }, interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, SLIDES.length]);

  const current = SLIDES[active];

  // Safety: if no slides, render nothing
  if (!SLIDES.length) return null;

  return (
    <div className="bg-gradient-to-r from-[#D5E7F7] to-white xl:mt-[10rem] py-1 lg:py-3">
      {/* ========================= */}
      {/* Desktop Banner */}
      {/* ========================= */}
      <div className="w-full xl:w-[90%] mx-auto mt-6 px-2 hidden lg:block">
        <div className="relative w-full h-[480px] rounded-[20px] overflow-hidden shadow-xl">
          {SLIDES.map((s, idx) => (
            <div
              key={s.id ?? idx}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {s.imageUrl && (
                <Image
                  src={s.imageUrl} // ✅ Desktop image
                  alt="banner-image"
                  fill
                  priority={idx === 0}
                  className="object-cover bg-center bg-no-repeat"
                />
              )}

              <div className="absolute inset-0" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center">
            <div className="text-white max-w-[90%] md:max-w-[650px] px-6 md:px-12">
              <h1 className="text-[26px] md:text-[40px] lg:text-[42px] font-semibold leading-tight mb-4">
                {current?.title}
              </h1>

              <p className="text-[14px] md:text-[16px] text-white/90 mb-6 font-normal">
                {current?.subtitle}
              </p>

              <div className="flex gap-4 flex-wrap">
                <button className="bg-[#356DA4] hover:bg-[#2d5c8b] transition text-white px-6 py-3 rounded-full text-[14px] md:text-[16px]">
                  {current?.primaryBtn}
                </button>

                <button className="border border-white text-white hover:bg-white hover:text-black transition px-6 py-3 rounded-full text-[14px] md:text-[16px]">
                  {current?.secondaryBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-2 lg:mt-4">
          <button
            onClick={prev}
            className="text-[#2C5C8F] text-2xl transition"
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="flex items-center gap-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  idx === active
                    ? "w-8 h-2 bg-[#356DA4] rounded-full"
                    : "w-2 h-2 bg-[#cbd5e1] rounded-full"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-[#2C5C8F] text-2xl transition"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
      {/* End Desktop Banner */}

      {/* ========================= */}
      {/* Mobile Banner */}
      {/* ========================= */}
      <div className="w-full xl:w-[90%] mx-auto mt-20 px-4 block lg:hidden">
        <div className="relative w-full h-[600px] rounded-[20px] overflow-hidden shadow-xl">
          {SLIDES.map((s, idx) => (
            <div
              key={s.id ?? idx}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* ✅ Mobile image if provided, else fallback to desktop image */}
              {(s.mobileImageUrl || s.imageUrl) && (
                <Image
                  src={s.mobileImageUrl || s.imageUrl}
                  alt="banner-image"
                  fill
                  priority={idx === 0}
                  className="object-cover bg-center bg-no-repeat"
                />
              )}

              <div className="absolute inset-0" />
            </div>
          ))}

          <div className="absolute inset-0 flex items-center text-center">
            <div className="text-white px-6 md:px-12">
              <h1 className="text-[26px] md:text-[40px] lg:text-[42px] font-semibold leading-tight mb-4">
                {current?.title}
              </h1>

              <p className="text-[14px] md:text-[16px] text-white/90 mb-6 font-normal">
                {current?.subtitle}
              </p>

              <div className="flex gap-4 flex-wrap align-middle justify-center items-center">
                <button className="bg-[#356DA4] hover:bg-[#2d5c8b] transition text-white px-6 py-3 rounded-full text-[14px] md:text-[16px]">
                  {current?.primaryBtn}
                </button>

                <button className="border border-white text-white hover:bg-white hover:text-black transition px-6 py-3 rounded-full text-[14px] md:text-[16px]">
                  {current?.secondaryBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-1 lg:mt-4">
          <button
            onClick={prev}
            className="text-[#2C5C8F] text-xl transition"
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="flex items-center gap-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  idx === active
                    ? "w-8 h-2 bg-[#356DA4] rounded-full"
                    : "w-2 h-2 bg-[#cbd5e1] rounded-full"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-[#2C5C8F] text-xl transition"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
      {/* End Mobile Banner */}
    </div>
  );
}
