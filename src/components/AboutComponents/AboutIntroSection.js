// ============================
// AboutIntroSection.jsx
// (matches screenshot layout: left collage image + right heading + paragraph)
// ============================
"use client";

import React from "react";
import Image from "next/image";
import aboutintro from '../../assets/about/aboutintro.jpg'

export default function AboutIntroSection() {
  return (
    <section className="w-full bg-[#EEF3F8] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[90%] px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="relative w-full max-w-[620px] mx-auto lg:mx-0">
            <div className="relative w-full aspect-[1.08/1]">
              <Image
                src={aboutintro}
                alt="Technology collage"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full">
            <h2 className="text-[#2E5D86] font-semibold leading-[120%] text-[34px] sm:text-[42px]">
              We are passionate about
              <br />
              talking on technologies
            </h2>

            <p className="mt-6 text-[#3A3A3A] text-[14px] sm:text-[16px] leading-[1.9] max-w-[780px]">
              Global Business Tech was formed in the year 2016 by a group of IT
              professionals with 15 + years of experience in the IT industry.
              Global Business Tech is the Leading Provider of Complete Office
              Communication and IT Solutions dedicated to design, integrating,
              and customizing advanced communication technologies and IT
              Infrastructure. Our Solutions are true integration of key
              components into a single system we focus on providing IT
              infrastructure solutions and services to customers across all
              verticals. We aim to give the best of class system integration
              services to our customer with add on services for the product and
              solution life cycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
