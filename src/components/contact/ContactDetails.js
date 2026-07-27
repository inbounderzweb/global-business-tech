// src/components/contact/ContactDetails.js
"use client";

import React from 'react';
import Image from 'next/image';
import contactmain from '../../assets/contact/contactmain.png';

export default function ContactDetails() {
  return (
    <section className="w-full bg-[#D6E0EA] py-12 md:py-16">
      <div className="mx-auto w-[98%] max-w-6xl px-4 md:px-6">
        {/* Top info row */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Illustration */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[420px]">
              <Image
                src={contactmain}
                alt="Contact illustration"
                width={900}
                height={650}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:pr-6">
            <h2 className="text-2xl font-bold text-[#2F6FB3]">
              We are just a ring away!
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We are ready to lead you into the future of Information
              Technology. Let’s have a rendezvous over coffee, on how we can
              help with creating effective solutions.
              <br />
              <br />
              Our expert team is available to assist you with any questions or
              technical requirements you may have. Reach out today and let's
              build the future together.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
