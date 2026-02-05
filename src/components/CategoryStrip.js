"use client";

import React, { useRef } from "react";
import Image from "next/image";

import audioicon from "../assets/icons/audioconf.svg";
import videoconf from "../assets/icons/videoconf.svg";
import headset from "../assets/icons/headset.svg";
import laptop from "../assets/icons/laptop.svg";
import server from "../assets/icons/server.svg";
import viewmore from "../assets/icons/more.svg";

function CategoryStrip() {
  const scrollerRef = useRef(null);

  const ITEMS = [
    { label: "Audio Conference", icon: audioicon },
    { label: "Video Conference", icon: videoconf },
    { label: "Professional Headsets", icon: headset },
    { label: "Laptops", icon: laptop },
    { label: "Servers", icon: server },
    { label: "View More", icon: viewmore },
  ];

  const scrollRight = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[#EEF3F8]">
      <div className="w-full xl:w-[80%] mx-auto px-2 pt-8">
        <div className="border-t border-[#B9D0E6] border-b border-[#B9D0E6] py-5 relative">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-[56px] h-[56px] rounded-full bg-[#356DA4] flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="service-icons" />
                </div>

                <p className="text-[#2C5C8F] text-[16px] leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden relative">
            <div
              ref={scrollerRef}
              className="
                flex items-center gap-10
                overflow-x-auto scroll-smooth no-scrollbar
                pl-4 pr-20
                snap-x snap-mandatory
              "
            >
              {ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 shrink-0 snap-start"
                >
                  <div className="w-[56px] h-[56px] rounded-full bg-[#356DA4] flex items-center justify-center shrink-0">
                    <Image src={item.icon} alt="service-icons" />
                  </div>

                  <p className="text-[#2C5C8F] text-[16px] leading-tight whitespace-nowrap">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              type="button"
              onClick={scrollRight}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                w-[42px] h-[42px]
                rounded-full bg-white shadow-md
                flex items-center justify-center
              "
              aria-label="Scroll right"
            >
              <span className="text-[#356DA4] text-2xl">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryStrip;
