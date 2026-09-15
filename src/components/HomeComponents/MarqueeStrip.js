// ============================
// MarqueeStrip.js
// ============================
'use client';

import React from 'react';

const MARQUEE_ITEMS = [
  'Audio-Visual Solutions',
  'IT Infrastructure Services',
  'Smart Workspace Technology',
  'Managed IT Services',
  'Global Business Tech',
  'Video Conferencing Systems',
  'Network & Server Solutions',
  '24/7 Technical Support',
];

export default function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full shrink-0 bg-[#356DA4] overflow-hidden py-3">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="text-white text-[14px] md:text-[16px] font-medium whitespace-nowrap px-4">
              {item}
            </span>
            <span className="text-white/50">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
