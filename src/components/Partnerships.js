// ============================
// Partnerships.js
// ============================
"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import cisco from "../assets/icons/cisco.jpg";
import hpe from "../assets/icons/hpe.jpg";

function Partnerships() {
  const filterScrollerRef = useRef(null);

  const filters = useMemo(
    () => [
      "All",
      "Networking",
      "Passive Networking",
      "Audio-Video",
      "Personal Computing",
      "Server and Storage",
      "Surveillance",
      "Enterprise Security",
      "Display solution",
      "Enterprise Software",
    ],
    []
  );

  const partners = useMemo(
    () => [
      {
        id: "microsoft",
        name: "Microsoft",
        logoSrc: cisco,
        categories: ["Enterprise Software", "Personal Computing"],
      },
      {
        id: "adobe",
        name: "Adobe",
        logoSrc: hpe,
        categories: ["Enterprise Software"],
      },
      {
        id: "siemens",
        name: "Siemens",
        logoSrc: hpe,
        categories: ["Enterprise Software", "Networking"],
      },
      {
        id: "zoho",
        name: "Zoho",
        logoSrc: cisco,
        categories: ["Enterprise Software"],
      },
      {
        id: "amp-network",
        name: "AMP Netconnect",
        logoSrc: cisco,
        categories: ["Networking", "Passive Networking"],
      },
      {
        id: "amp-av",
        name: "AMP Netconnect",
        logoSrc: hpe,
        categories: ["Audio-Video", "Personal Computing"],
      },
      {
        id: "amp-server",
        name: "AMP Netconnect",
        logoSrc: cisco,
        categories: ["Server and Storage", "Surveillance"],
      },
      {
        id: "amp-security",
        name: "AMP Netconnect",
        logoSrc: hpe,
        categories: ["Enterprise Security"],
      },
      {
        id: "amp-display",
        name: "AMP Netconnect",
        logoSrc: cisco,
        categories: ["Display solution"],
      },
    ],
    []
  );

  const [activeFilter, setActiveFilter] = useState("All");
  const [isFading, setIsFading] = useState(false);

  const filteredPartners = useMemo(() => {
    if (activeFilter === "All") return partners;
    return partners.filter((p) => p.categories.includes(activeFilter));
  }, [partners, activeFilter]);

  const onChangeFilter = (f) => {
    if (f === activeFilter) return;

    // ✅ Fade out -> change -> fade in
    setIsFading(true);
    window.setTimeout(() => {
      setActiveFilter(f);
      setIsFading(false);

      // ❌ DO NOT scroll filters back to start (keeps user position)
      // if (filterScrollerRef.current) {
      //   filterScrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      // }
    }, 220);
  };

  const scrollFiltersRight = () => {
    if (!filterScrollerRef.current) return;
    filterScrollerRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#EEF3F8] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        {/* Heading */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#356DA4] text-[28px] sm:text-[34px] font-semibold">
            Explore The
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
            nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>

        {/* Filters - Desktop */}
        <div className="mt-8 hidden sm:flex flex-wrap justify-center gap-4">
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onChangeFilter(f)}
                className={`px-6 py-1 rounded-full border text-[16px] transition ${
                  isActive
                    ? "bg-[#B9C9DA] border-[#B9C9DA] text-[#1E2B3A]"
                    : "bg-transparent border-[#B9D0E6] text-[#356DA4] hover:bg-white/60"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Filters - Mobile Slider */}
        <div className="mt-6 sm:hidden relative">
          <div
            ref={filterScrollerRef}
            className="flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar pr-14"
          >
            {filters.map((f) => {
              const isActive = f === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => onChangeFilter(f)}
                  className={`shrink-0 px-5 py-2 rounded-full border text-[14px] transition whitespace-nowrap ${
                    isActive
                      ? "bg-[#B9C9DA] border-[#B9C9DA] text-[#1E2B3A]"
                      : "bg-transparent border-[#B9D0E6] text-[#356DA4] hover:bg-white/60"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollFiltersRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-white shadow-md flex items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="text-[#356DA4] text-2xl">{">"}</span>
          </button>
        </div>

        {/* Big Container (STATIC HEIGHT) */}
        <div
          className="
            mt-10 border border-[#B9D0E6] rounded-[22px] bg-[#DEE9F2]
            p-6 sm:p-10
            min-h-[260px] sm:min-h-[300px]
            flex items-center
          "
        >
          {/* Desktop logos */}
          <div
            className={`
              hidden sm:flex w-full flex-wrap gap-8 justify-center items-center
              transition-opacity duration-300 ease-in-out
              ${isFading ? "opacity-0" : "opacity-100"}
            `}
          >
            {filteredPartners.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm px-8 py-5 flex items-center justify-center min-w-[180px]"
              >
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={90}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}

            {filteredPartners.length === 0 && (
              <div className="w-full text-center py-10 text-[#356DA4] font-medium">
                No partners found for “{activeFilter}”.
              </div>
            )}
          </div>

          {/* Mobile logos: 2 per column + centered */}
          <div
            className={`
              sm:hidden w-full
              transition-opacity duration-300 ease-in-out
              ${isFading ? "opacity-0" : "opacity-100"}
            `}
          >
            {filteredPartners.length === 0 ? (
              <div className="w-full text-center py-10 text-[#356DA4] font-medium">
                No partners found for “{activeFilter}”.
              </div>
            ) : (
              <div className="w-full overflow-x-auto no-scrollbar">
                {/* ✅ Centering trick: wrapper has px, inner uses inline-flex and mx-auto */}
                <div className="px-2">
                  <div className="inline-flex gap-4 scroll-smooth">
                    {Array.from({
                      length: Math.ceil(filteredPartners.length / 2),
                    }).map((_, colIdx) => {
                      const first = filteredPartners[colIdx * 2];
                      const second = filteredPartners[colIdx * 2 + 1];

                      return (
                        <div
                          key={colIdx}
                          className="shrink-0 w-[260px] flex flex-col gap-4"
                        >
                          {[first, second].filter(Boolean).map((p) => (
                            <div
                              key={p.id}
                              className="bg-white rounded-xl shadow-sm px-6 py-5 flex items-center justify-center w-full"
                            >
                              <Image
                                src={p.logoSrc}
                                alt={p.name}
                                width={90}
                                height={50}
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* ✅ if only 1 column, it will look centered because container is full width */}
                  {/* and the column width is fixed; user sees it centered with the padding */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partnerships;
