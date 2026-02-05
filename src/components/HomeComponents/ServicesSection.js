// ============================
// ServicesSection.js
// Desktop = 3 + 2 centered layout
// Mobile = slider with arrows + dots
// Uses /public images (NO import errors)
// ============================
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import service1 from '../../assets/services/service1.jpg';
import service2 from '../../assets/services/service2.jpg';
import service3 from '../../assets/services/service3.jpg';
import service4 from '../../assets/services/service4.jpg';
import service5 from '../../assets/services/service5.jpg';


export default function ServicesSection() {
  const SERVICES = useMemo(
    () => [
      {
        id: 1,
        title: "Networking",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
        imageUrl: service1,
        href: "#",
      },
      {
        id: 2,
        title: "Virtualization",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
        imageUrl: service2,
        href: "#",
      },
      {
        id: 3,
        title: "Board Room",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
        imageUrl: service3,
        href: "#",
      },
      {
        id: 4,
        title: "Cyber Security",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
        imageUrl: service4,
        href: "#",
      },
      {
        id: 5,
        title: "Video Wall and\nSignage Solutions",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
        imageUrl: service5,
        href: "#",
      },
    ],
    []
  );

  // ----------------------------
  // Mobile slider logic
  // ----------------------------
  const scrollerRef = useRef(null);
  const firstItemRef = useRef(null);

  const [active, setActive] = useState(0);
  const [step, setStep] = useState(320);

  useEffect(() => {
    const el = scrollerRef.current;
    const first = firstItemRef.current;
    if (!el || !first) return;

    const computeStep = () => {
      const gap = 24; // gap-6
      const w = first.getBoundingClientRect().width;
      setStep(Math.round(w + gap));
    };

    computeStep();
    window.addEventListener("resize", computeStep);
    return () => window.removeEventListener("resize", computeStep);
  }, []);

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * step, behavior: "smooth" });
    setActive(idx);
  };

  const prev = () =>
    scrollToIndex(active === 0 ? SERVICES.length - 1 : active - 1);
  const next = () =>
    scrollToIndex(active === SERVICES.length - 1 ? 0 : active + 1);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / step);
    if (idx !== active) {
      setActive(Math.max(0, Math.min(SERVICES.length - 1, idx)));
    }
  };

  return (
    <section className="w-full bg-[#EEF3F8] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        {/* Heading */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#2C5C8F] text-[28px] sm:text-[34px] font-semibold">
            Services
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
            euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>

        {/* =========================
            DESKTOP / TABLET GRID
           ========================= */}
        <div className="hidden sm:block mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-10 gap-y-14">
            {SERVICES.map((s, idx) => {
              const bottomCenterClass =
                idx === 3 ? "lg:col-start-2" : idx === 4 ? "lg:col-start-4" : "";

              return (
                <div key={s.id} className={`col-span-2 ${bottomCenterClass} text-center`}>
                  <div className="relative w-full h-[180px] md:h-[200px] rounded-[18px] overflow-hidden shadow-sm">
                    <Image
                      src={s.imageUrl}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>

                  <h3 className="mt-4 text-[#356DA4] text-[18px] font-semibold">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-[#3A3A3A] text-[13px] leading-relaxed max-w-[340px] mx-auto">
                    {s.desc}
                  </p>

                  <a
                    href={s.href}
                    className="inline-flex items-center justify-center mt-4 bg-[#356DA4] text-white px-10 py-2 rounded-full text-[14px] hover:bg-[#2d5c8b] transition"
                  >
                    Read more
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              className="border border-[#356DA4] text-[#356DA4] px-12 py-2 rounded-full hover:bg-white/60 transition"
            >
              Show all services
            </button>
          </div>
        </div>

        {/* =========================
            MOBILE SLIDER
           ========================= */}
        <div className="sm:hidden mt-10">
          <div className="relative">
            <div
              ref={scrollerRef}
              onScroll={onScroll}
              className="
                flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
                px-2 pr-10
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              "
            >
              {SERVICES.map((s, idx) => (
                <div
                  key={s.id}
                  ref={idx === 0 ? firstItemRef : null}
                  className="snap-start shrink-0 w-[86vw] max-w-[420px]"
                >
                  <div className="text-center">
                    <div className="relative w-full h-[220px] rounded-[18px] overflow-hidden shadow-sm">
                      <Image
                        src={s.imageUrl}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="90vw"
                        priority={idx === 0}
                      />
                    </div>

                    <h3 className="mt-4 text-[#356DA4] text-[18px] font-semibold">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-[#3A3A3A] text-[13px] leading-relaxed px-4">
                      {s.desc}
                    </p>

                    <a
                      href={s.href}
                      className="inline-flex items-center justify-center mt-4 bg-[#356DA4] text-white px-12 py-3 rounded-full text-[14px] hover:bg-[#2d5c8b] transition"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                type="button"
                onClick={prev}
                className="text-[#3A3A3A] text-2xl"
                aria-label="Previous service"
              >
                ←
              </button>

              <div className="flex items-center gap-3">
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to service ${i + 1}`}
                    className={`transition-all duration-300 ${
                      i === active
                        ? "w-10 h-2 bg-[#356DA4] rounded-full"
                        : "w-2 h-2 bg-[#cbd5e1] rounded-full"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="text-[#3A3A3A] text-2xl"
                aria-label="Next service"
              >
                →
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="border border-[#356DA4] text-[#356DA4] px-12 py-2 rounded-full hover:bg-white/60 transition"
              >
                View all services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
