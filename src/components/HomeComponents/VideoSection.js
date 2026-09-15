// ============================
// VideoSection.js
// ============================
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

// ✅ Replace with your real thumbnail later (local image recommended)
import videoThumb from "../../assets/banner/banner.png"; // change path

// ✅ Icons for USPS
import endToEndIcon from "../../assets/icons/end-to-end.png";
import expertiseIcon from "../../assets/icons/expertise.png";
import oemIcon from "../../assets/icons/oem.png";
import { WhyChooseGlobalBusinessTech } from "./WhyChooseGlobalBusinessTech";

function VideoSection() {
  // ✅ Replace icons later
  const USPS = useMemo(
    () => [
      {
        id: 1,
        title: "End-to-End Solutions",
        desc: " Complete AV and IT solutions delivered under one roof.",
        icon: endToEndIcon,
      },
      {
        id: 2,
        title: "Proven Expertise",
        desc: "10+ years of experience with 200+ satisfied clients.",
        icon: expertiseIcon,
      },
      {
        id: 3,
        title: "Trusted OEM Partnerships",
        desc: "Strong alliances with leading global technology brands.",
        icon: oemIcon,
      },
    ],
    []
  );

  // ✅ If you want a real video later, set your mp4 url here (or YouTube embed)
  const videoUrl = ""; // e.g. "/videos/gbt.mp4"
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-[#2C5C8F] py-10 sm:py-14">
      <div className="w-full xl:w-[90%] mx-auto px-4">
        {/* Top content */}
        {/* <WhyChooseGlobalBusinessTech
          videoThumb={videoThumb}
          onPlay={() => setOpen(true)}
        /> */}

        {/* USP row */}
        <div className="mt-10 lg:mt-12">
          {/* Desktop: 3 columns + dividers */}
          <div className="hidden lg:grid grid-cols-3 items-center">
            {USPS.map((u, idx) => (
              <div key={u.id} className="flex items-center gap-5 px-2">
                <div className="w-[80px] h-[65px] rounded-full bg-white/15 flex items-center justify-center text-white/80 overflow-hidden p-2">
                  <Image src={u.icon} alt={u.title} className="object-contain" />
                </div>

                <div>
                  <p className="text-white/85 text-[18px] font-semibold">
                    {u.title}
                  </p>
                  <p className="text-white/75 text-[14px] mt-1 leading-relaxed">
                    {u.desc}
                  </p>
                </div>

                {/* divider after item 1 & 2 */}
                {idx !== 2 && (
                  <div className="ml-auto h-[64px] w-[1px] bg-white/20" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: stacked with horizontal dividers */}
          <div className="lg:hidden mt-8">
            {USPS.map((u, idx) => (
              <div key={u.id}>
                <div className="flex items-center gap-5 py-6">
                  <div className="w-[70px] h-[75px] rounded-full bg-white/15 flex items-center justify-center text-white/80 shrink-0 overflow-hidden p-2">
                    <Image src={u.icon} alt={u.title} className="object-contain" />
                  </div>

                  <div>
                    <p className="text-white/85 text-[18px] font-semibold">
                      {u.title}
                    </p>
                    <p className="text-white/75 text-[14px] mt-1 leading-relaxed">
                      {u.desc}
                    </p>
                  </div>
                </div>

                {idx !== USPS.length - 1 && (
                  <div className="h-[1px] w-full bg-white/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================
          Modal (optional)
          ============================ */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-[980px] bg-black rounded-[16px] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
              aria-label="Close video"
            >
              ✕
            </button>

            <div className="relative w-full aspect-video bg-black">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/80 text-center px-6">
                  Add your video URL in <b className="mx-1">videoUrl</b>
                  (mp4) or replace this block with a YouTube embed.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoSection;
