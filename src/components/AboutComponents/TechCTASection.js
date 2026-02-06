// ============================
// TechCTASection.jsx
// Fix mobile hands overlap by controlling object-position + height
// ============================
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import desktopBg from "../../assets/about/rhd.png";
import mobileBg from "../../assets/about/rhm.png";

export default function TechCTASection() {
  return (
    <section className="w-full">
     {/* BOTTOM CTA */}
<div className="relative w-full overflow-hidden bg-[#C8D9EA]">
  {/* ✅ Remove top gap + stabilize crop */}
  <div className="relative min-h-[560px] md:min-h-[420px]">
    {/* Desktop BG */}
    <div className="hidden md:block absolute inset-0">
      <Image
        src={desktopBg}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
    </div>

    {/* Mobile BG */}
    <div className="md:hidden absolute inset-0">
      <Image
        src={mobileBg}
        alt=""
        fill
        priority
        className="object-cover"
        // ✅ anchor to top so no “gap” + keeps hand away from center more
        style={{ objectPosition: "50% 0%" }}
      />

      {/* ✅ VERY IMPORTANT:
          Add a soft center “readability shield” so the hand never competes with text.
          This is subtle, not visible as a box—just reduces overlap visually. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/35 to-white/0" />
    </div>

    {/* Desktop subtle overlay (optional) */}
    <div className="hidden md:block absolute inset-0 bg-white/5" />

    {/* Content */}
    <div className="relative mx-auto w-full max-w-[1400px] px-4 md:px-8">
      {/* ✅ Push content down on mobile so it doesn’t sit on the top hand */}
      <div className="pt-20 pb-16 md:py-20 flex items-center justify-center text-center">
        <div className="max-w-[920px]">
          <div className="text-[12px] md:text-[14px] tracking-[0.12em] uppercase text-[#7B8793]">
            FIND THE BEST BRANDED PRODUCTS
          </div>

          {/* ✅ reduce width so text block stays in safe center column */}
          <h3 className="mt-4 mx-auto max-w-[520px] md:max-w-none text-[#2F2F2F] font-semibold leading-[1.12] text-[34px] sm:text-[40px] md:text-[38px]">
            These all <br className="sm:hidden" />
            InnovativeTechnology is <br />
            meant for <br />
            your smooth life
          </h3>

          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="
                inline-flex items-center justify-center
                h-[64px]
                px-12
                rounded-full
                bg-[#2E6EA5]
                text-white
                text-[18px]
                font-medium
                hover:brightness-110
                active:brightness-95
                transition
              "
            >
              Check our Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </section>
  );
}
