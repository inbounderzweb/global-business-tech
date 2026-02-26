// ============================
// StatsStrip.js
// ============================
"use client";

import React from "react";

export default function StatsStrip() {
  const stats = [
    { value: "200+", label: "Clients" },
    { value: "100+", label: "Turnkey Projects" },
    { value: "3000+", label: "Partners" },
    { value: "20+", label: "Certifications" },
  ];

  return (
    <section className="w-full bg-[#1F3E55]">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        <div className="py-14 md:py-20">
          {/* Desktop: 3 columns */}
          <div className="hidden md:grid grid-cols-4 items-center text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-[#CFE0F0] text-[64px] leading-none font-light">
                  {s.value}
                </div>
                <div className="mt-3 text-white/90 text-[16px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden flex flex-col items-center text-center gap-14">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-[#CFE0F0] text-[54px] leading-none font-light">
                  {s.value}
                </div>
                <div className="mt-2 text-white/90 text-[16px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
