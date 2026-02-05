// ============================
// ProductsGrid.js
// ============================
"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import headset from "../../assets/dummyproductimages/headset.png";

function ProductsGrid() {
  const scrollerRef = useRef(null);

  const products = useMemo(
    () => [
      { id: 1, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 2, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 3, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 4, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 5, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 6, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 7, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
      { id: 8, title: "Poly Blackwire 3200", badge: "Blackwire", imageUrl: headset, href: "#" },
    ],
    []
  );

  const scrollRight = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#BFD0DF] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-4">
        {/* ========================= */}
        {/* Title */}
        {/* ========================= */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#2C5C8F] text-[28px] sm:text-[34px] font-semibold">
            Products
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>

        {/* ========================= */}
        {/* MOBILE SLIDER */}
        {/* ========================= */}
        <div className="mt-10 relative sm:hidden">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pl-8 pr-6"
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="shrink-0 w-[280px] text-center"
              >
                <div className="bg-white rounded-[16px] p-5 shadow-sm">
                  <div className="relative w-full h-[260px] overflow-hidden rounded-[12px] group">
                    {/* Badge */}
                    <div className="absolute top-2 right-2 z-10 bg-gray-400/10 backdrop-blur-xl text-[#3A3A3A] text-[12px] px-3 py-1 rounded-full">
                      {p.badge}
                    </div>

                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                      sizes="80vw"
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-[#3A3A3A] text-[20px] font-semibold">
                  {p.title}
                </h3>

                <a
                  href={p.href}
                  className="inline-flex items-center justify-center mt-3 bg-[#356DA4] text-white px-10 py-3 rounded-full text-[18px] hover:bg-[#2d5c8b] transition"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <span className="text-[#356DA4] text-3xl">›</span>
          </button>
        </div>

        {/* ========================= */}
        {/* DESKTOP GRID */}
        {/* ========================= */}
        <div className="mt-10 hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {products.map((p) => (
            <div key={p.id} className="text-center">
              <div className="bg-white rounded-[16px] p-5 shadow-sm w-full max-w-[270px] mx-auto">
                <div className="relative w-full h-[220px] overflow-hidden rounded-[12px] group">
                  <div className="absolute top-2 right-2 z-5 bg-gray-400/10 backdrop-blur-xl text-[#3A3A3A] text-[12px] px-3 py-1 rounded-full">
                    {p.badge}
                  </div>

                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                    sizes="(max-width:1024px) 40vw, 25vw"
                  />
                </div>
              </div>

              <h3 className="mt-4 text-[#3A3A3A] text-[18px] font-semibold">
                {p.title}
              </h3>

              <a
                href={p.href}
                className="inline-flex items-center justify-center mt-3 bg-[#356DA4] text-white px-8 py-2 rounded-full text-[14px] hover:bg-[#2d5c8b] transition"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* Bottom Button */}
        {/* ========================= */}
        <div className="flex justify-center mt-12">
          <button
            type="button"
            className="border border-[#356DA4] text-[#356DA4] px-10 py-2 rounded-full hover:bg-white/60 transition"
          >
            Show all products
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* Hide Scrollbar Utility */}
      {/* ========================= */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default ProductsGrid;
