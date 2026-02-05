// ============================
// VideoSection.js
// ============================
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

// ✅ Replace with your real thumbnail later (local image recommended)
import videoThumb from "../assets/banner/banner.png"; // change path

function VideoSection() {
  // ✅ Replace icons later
  const USPS = useMemo(
    () => [
      {
        id: 1,
        title: "USP 1",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing .",
      },
      {
        id: 2,
        title: "USP 2",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing .",
      },
      {
        id: 3,
        title: "USP 3",
        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing .",
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
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8 lg:gap-12 items-center">
          {/* Video thumbnail */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative w-full h-[260px] sm:h-[320px] lg:h-[300px] rounded-[18px] overflow-hidden shadow-lg"
            aria-label="Play video"
          >
            <Image
              src={videoThumb}
              alt="video-thumbnail"
              fill
              className="object-cover"
              priority
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[88px] h-[88px] rounded-full border-[4px] border-white flex items-center justify-center">
                <div
                  className="ml-1"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "14px solid transparent",
                    borderBottom: "14px solid transparent",
                    borderLeft: "22px solid white",
                  }}
                />
              </div>
            </div>
          </button>

          {/* Text */}
          <div className="text-white">
            {/* Desktop title */}
            <h2 className="hidden lg:block text-[34px] font-semibold leading-tight text-white/90">
              Why Global Business Tech
            </h2>

            {/* Mobile title */}
            <h2 className="lg:hidden text-center text-[32px] font-semibold leading-tight text-white/90">
              Why <br />
              Global Business Tech
            </h2>

            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/80 text-center lg:text-left">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* USP row */}
        <div className="mt-10 lg:mt-12">
          {/* Desktop: 3 columns + dividers */}
          <div className="hidden lg:grid grid-cols-3 items-center">
            {USPS.map((u, idx) => (
              <div key={u.id} className="flex items-center gap-5 px-2">
                <div className="w-[80px] h-[65px] rounded-full bg-white/15 flex items-center justify-center text-white/80">
                  <span className="text-[14px]">Icon</span>
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
                  <div className="w-[70px] h-[75px] rounded-full bg-white/15 flex items-center justify-center text-white/80 shrink-0">
                    <span className="text-[14px]">Icon</span>
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
