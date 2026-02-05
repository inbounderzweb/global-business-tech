// ============================
// DiscussWithUsSection.jsx
// BG handled inside component
// ============================
"use client";

import React from "react";
import Image from "next/image";

// ✅ Import your exported images from Figma here:
import desktopimg from "../assets/desktopbg.jpg";
import mobbg from "../assets/mobbg.jpg";

export default function DiscussWithUsSection({ onSubmit }) {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        {/* Desktop BG */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={desktopimg}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Mobile BG */}
        <div className="md:hidden absolute inset-0">
          <Image
            src={mobbg}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Overlay (for readability like screenshot) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 20%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%), linear-gradient(90deg, rgba(9,18,33,0.55), rgba(9,18,33,0.25) 55%, rgba(9,18,33,0.35))",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="min-h-[420px] flex items-stretch">
              {/* LEFT */}
              <div className="w-full md:w-[58%] py-10 md:py-14 pt-80">
                <h2 className="text-[#D6E3F3] font-semibold leading-[1.05] text-[34px] md:text-[44px]">
                  You have something
                  <br />
                  to discuss with us ??
                </h2>

                <p className="mt-4 text-[#B9C6D8] text-[14px] md:text-[15px] leading-relaxed max-w-[520px]">
                  Drop your Email address and Phone number, will we reach
                  <br className="hidden md:block" />
                  you with handful offers
                </p>

                <form
                  className="mt-7 md:mt-9"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.(e);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-[640px]">
                    <Field label="Full Name" placeholder="Full Name" name="fullName" />
                    <Field label="Mail id" placeholder="Mail id" name="email" />
                    <Field label="Phone Number" placeholder="Phone Number" name="phone" />
                    <Field label="Business" placeholder="Business" name="business" />
                  </div>

                  <div className="mt-8 md:mt-9 max-w-[640px] flex justify-center md:justify-start">
                    <button
                      type="submit"
                      className="
                        w-[220px] md:w-[260px]
                        h-[46px]
                        rounded-full
                        bg-[#2F6FAE]
                        text-white
                        text-[14px]
                        font-medium
                        hover:brightness-110
                        active:brightness-95
                        transition
                      "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* RIGHT (empty because it’s in the BG image) */}
              <div className="hidden md:block md:w-[42%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, name }) {
  return (
    <label className="block">
      <span className="block text-[#B9C6D8] text-[12px] mb-2">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        className="
          w-full
          h-[42px]
          rounded-[8px]
          px-4
          bg-[rgba(255,255,255,0.16)]
          text-[#DDE8F7]
          placeholder:text-[rgba(221,232,247,0.35)]
          border border-[rgba(255,255,255,0.10)]
          outline-none
          focus:border-[rgba(132,183,255,0.7)]
          focus:ring-2 focus:ring-[rgba(132,183,255,0.18)]
          transition
        "
        autoComplete="off"
      />
    </label>
  );
}
