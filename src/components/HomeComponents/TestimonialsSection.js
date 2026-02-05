"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";

import t1 from "../../assets/testimonial/1.png";
import t2 from "../../assets/testimonial/2.png";
import t3 from "../../assets/testimonial/3.png";

export default function TestimonialsSection() {
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]); // refs for *rendered* items (including clones)
  const autoplayRef = useRef(null);
  const isJumpingRef = useRef(false);

  const [activeReal, setActiveReal] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- SETTINGS ---
  const AUTOPLAY = true;
  const AUTOPLAY_DELAY = 3000; // ms
  const CLONE_COUNT = 1; // clone 1 at both ends (enough for next/prev loop)

  const testimonials = useMemo(
    () => [
      { id: 1, name: "Full Name", text: "Lorem ipsum dolor sit amet...", avatar: t1 },
      { id: 2, name: "Full Name", text: "Lorem ipsum dolor sit amet...", avatar: t2 },
      { id: 3, name: "Full Name", text: "Lorem ipsum dolor sit amet...", avatar: t3 },
      { id: 4, name: "Full Name", text: "Lorem ipsum dolor sit amet...", avatar: t2 },
    ],
    []
  );

  // Build rendered list with clones: [last..] + originals + [first..]
  const rendered = useMemo(() => {
    const n = testimonials.length;
    const head = testimonials.slice(0, CLONE_COUNT);
    const tail = testimonials.slice(n - CLONE_COUNT, n);
    return [...tail, ...testimonials, ...head];
  }, [testimonials]);

  // Helper: smooth vs instant
  const scrollToRenderedIndex = useCallback((renderedIdx, behavior = "smooth") => {
    const scroller = scrollerRef.current;
    const el = itemRefs.current[renderedIdx];
    if (!scroller || !el) return;

    // Use the element’s offset within the scroll container
    scroller.scrollTo({
      left: el.offsetLeft - (scroller.clientWidth - el.clientWidth) / 2,
      behavior,
    });
  }, []);

  // Start on first REAL item (index = CLONE_COUNT in rendered array)
  useEffect(() => {
    // wait next tick so layout is ready
    const t = setTimeout(() => {
      scrollToRenderedIndex(CLONE_COUNT, "auto");
    }, 0);
    return () => clearTimeout(t);
  }, [scrollToRenderedIndex]);

  // Compute which rendered card is closest to center -> update activeReal
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = null;

    const compute = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      const centerX = scrollerRect.left + scrollerRect.width / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((node, idx) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const nodeCenter = r.left + r.width / 2;
        const dist = Math.abs(centerX - nodeCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      // Translate rendered index to real index
      const realCount = testimonials.length;
      let realIdx = bestIdx - CLONE_COUNT;
      if (realIdx < 0) realIdx += realCount;
      if (realIdx >= realCount) realIdx -= realCount;

      setActiveReal(realIdx);

      // If we landed in clone zones, jump instantly to matching real slide
      // left clone zone: 0..CLONE_COUNT-1  -> jump to corresponding end real
      // right clone zone: CLONE_COUNT+realCount .. end -> jump to corresponding start real
      if (isJumpingRef.current) return;

      const leftCloneZone = bestIdx < CLONE_COUNT;
      const rightCloneZone = bestIdx >= CLONE_COUNT + realCount;

      if (leftCloneZone) {
        isJumpingRef.current = true;
        // jump to the matching real slide at the end
        const targetRendered = CLONE_COUNT + realCount - 1; // last real
        requestAnimationFrame(() => {
          scrollToRenderedIndex(targetRendered, "auto");
          isJumpingRef.current = false;
        });
      } else if (rightCloneZone) {
        isJumpingRef.current = true;
        // jump to the matching real slide at the start
        const targetRendered = CLONE_COUNT; // first real
        requestAnimationFrame(() => {
          scrollToRenderedIndex(targetRendered, "auto");
          isJumpingRef.current = false;
        });
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        compute();
      });
    };

    compute();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollToRenderedIndex, testimonials.length]);

  // Go prev/next in REAL indices
  const goToRealIndex = useCallback(
    (realIdx, behavior = "smooth") => {
      // realIdx in [0..n-1] -> rendered index = CLONE_COUNT + realIdx
      scrollToRenderedIndex(CLONE_COUNT + realIdx, behavior);
    },
    [scrollToRenderedIndex]
  );

  const prev = useCallback(() => {
    const n = testimonials.length;
    const nextIdx = (activeReal - 1 + n) % n;
    goToRealIndex(nextIdx);
  }, [activeReal, goToRealIndex, testimonials.length]);

  const next = useCallback(() => {
    const n = testimonials.length;
    const nextIdx = (activeReal + 1) % n;
    goToRealIndex(nextIdx);
  }, [activeReal, goToRealIndex, testimonials.length]);

  // Autoplay + pause on hover/focus/touch + reduced motion
  useEffect(() => {
    if (!AUTOPLAY) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // respect user preference

    const clear = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    clear();
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        next();
      }, AUTOPLAY_DELAY);
    }

    return clear;
  }, [isPaused, next]);

  // Pause handlers
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return (
    <section className="w-full bg-[#EEF3F8] py-14">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        {/* Heading */}
        <div className="text-center max-w-[920px] mx-auto">
          <h2 className="text-[#356DA4] text-[28px] sm:text-[34px] font-semibold">
            User testimonials
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
          </p>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <div
            className="relative"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            <div
              ref={scrollerRef}
              tabIndex={0}
              onFocus={pause}
              onBlur={resume}
              className="
                flex gap-6
                overflow-x-auto
                snap-x snap-mandatory
                px-3 md:px-0
                focus:outline-none
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {/* fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#EEF3F8] to-transparent z-5" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#EEF3F8] to-transparent z-5" />

              {rendered.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`} // include idx because clones reuse ids
                  ref={(el) => (itemRefs.current[idx] = el)}
                  className="snap-center shrink-0 w-[86%] sm:w-[420px] md:w-[360px]"
                >
                  <div className="bg-[#DEE9F2] rounded-[18px] px-7 py-10 text-center min-h-[330px] flex flex-col items-center justify-start">
                    <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden mb-4">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="70px"
                      />
                    </div>

                    <h3 className="text-[#356DA4] text-[24px] font-semibold mb-3">
                      {t.name}
                    </h3>

                    <p className="text-[#3A3A3A] text-[14px] leading-relaxed max-w-[320px]">
                      {t.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prev}
              className="text-[#565656] text-2xl hover:text-black transition"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToRealIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`transition-all duration-300 ${
                    idx === activeReal
                      ? "w-10 h-2 bg-[#356DA4] rounded-full"
                      : "w-2 h-2 bg-[#cbd5e1] rounded-full"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="text-[#565656] text-2xl hover:text-black transition"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
