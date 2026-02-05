// ============================
// FooterSection.jsx
// Next.js + Tailwind (Pixel-style layout like your screenshots)
// ============================
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * ✅ Replace these imports with your exported Figma assets
 * Put them inside /src/assets/footer/ (or your preferred folder)
 */
import logo from "../assets/footer/logo.svg";         // company logo mark
import indiaFlag from "../assets/footer/india.svg";   // india flag
import meFlag from "../assets/footer/me.svg";         // middle east flag (or jordan/palestine flag like screenshot)

export default function FooterSection() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-[#163A55] text-white">
      {/* Top content */}
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-10 md:py-12">
        {/* Desktop layout: 4 columns */}
        <div className="hidden md:grid grid-cols-4 gap-10 items-start">
          {/* Column 1: Logo + name */}
          <div className="flex items-start gap-4">
            <div className="relative w-[200px] h-[200px] shrink-0">
              <Image src={logo} alt="Global Business Tech" fill className="object-contain" />
            </div>
         
          </div>

          {/* Column 2: India */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-[30px] h-[20px]">
                <Image src={indiaFlag} alt="India" fill className="object-cover rounded-[2px]" />
              </div>
              <div className="text-[14px] font-medium text-[rgba(255,255,255,0.9)]">
                INDIA (Head Quarter)
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)]">
              No 1, 3rd Floor, 9th Cross,
              <br />
              2nd Main Road, Swimming Pool
              <br />
              Extension, Malleshwaram,
              <br />
              Bangalore, Karnataka – 560003
            </p>
          </div>

          {/* Column 3: Middle East */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-[30px] h-[20px]">
                <Image src={meFlag} alt="Middle East" fill className="object-cover rounded-[2px]" />
              </div>
              <div className="text-[14px] font-medium text-[rgba(255,255,255,0.9)]">
                MIDDLE EAST
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)]">
              No 302, BaldhiyaBuilding,
              <br />
              Freej Almurar,
              <br />
              Deira Dubai UAE-241868
            </p>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <div className="text-[14px] font-medium mb-4 text-[rgba(255,255,255,0.9)]">
              CONTACT DETAILS
            </div>

            <div className="space-y-3 text-[13px] text-[rgba(255,255,255,0.78)]">
              <Row icon={<PhoneIcon />} text="+91 80 35493772" />
              <Row icon={<MobileIcon />} text="+91 8904341299 | +91 9739919398" />
              <Row icon={<MailIcon />} text="Info@globalbusinesstech.in" />
              <Row icon={<WhatsappIcon />} text="+91 8904341299" />
            </div>
          </div>
        </div>

        {/* Mobile layout: stacked & centered like screenshot */}
        <div className="md:hidden text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-[78px] h-[78px]">
              <Image src={logo} alt="Global Business Tech" fill className="object-contain" />
            </div>

            <div className="mt-3 font-semibold leading-tight text-[16px]">
              Global Business
              <br />
              Tech PVT LTD
            </div>
            <div className="text-[12px] text-[rgba(255,255,255,0.75)] mt-1">
              One Stop IT Solution
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.65)] mt-4">
              (An ISO 9001 : 2015 Company)
            </div>
          </div>

          {/* India */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative w-[36px] h-[24px]">
              <Image src={indiaFlag} alt="India" fill className="object-cover rounded-[2px]" />
            </div>
            <div className="mt-3 text-[14px] font-medium text-[rgba(255,255,255,0.9)]">
              INDIA (Head Quarter)
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)] max-w-[310px]">
              No 1, 3rd Floor, 9th Cross, 2nd Main Road,
              Swimming Pool Extension, Malleshwaram,
              Bangalore, Karnataka – 560003
            </p>
          </div>

          {/* Middle East */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative w-[36px] h-[24px]">
              <Image src={meFlag} alt="Middle East" fill className="object-cover rounded-[2px]" />
            </div>
            <div className="mt-3 text-[14px] font-medium text-[rgba(255,255,255,0.9)]">
              MIDDLE EAST
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)] max-w-[310px]">
              No 302, BaldhiyaBuilding, Freej Almurar,
              Deira Dubai UAE-241868
            </p>
          </div>

          {/* Contact */}
          <div className="mt-10">
            <div className="text-[14px] font-medium mb-4 text-[rgba(255,255,255,0.9)]">
              CONTACT DETAILS
            </div>

            <div className="space-y-3 text-[13px] text-[rgba(255,255,255,0.78)] flex flex-col items-center">
              <Row icon={<PhoneIcon />} text="+91 80 35493772" center />
              <Row icon={<MobileIcon />} text="+91 8904341299 | +91 9739919398" center />
              <Row icon={<MailIcon />} text="Info@globalbusinesstech.in" center />
              <Row icon={<WhatsappIcon />} text="+91 8904341299" center />
            </div>
          </div>
        </div>

        {/* Nav Pills */}
        <div className="mt-10 md:mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="
                px-6 py-2.5 rounded-[10px]
                bg-[rgba(255,255,255,0.08)]
                text-[14px] font-medium
                text-[rgba(255,255,255,0.9)]
                hover:bg-[rgba(255,255,255,0.12)]
                transition
              "
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex items-center gap-6 justify-center md:justify-end">
          <SocialCircle href="#" label="Facebook" icon={<FacebookIcon />} />
          <SocialCircle href="#" label="Instagram" icon={<InstagramIcon />} />
          <SocialCircle href="#" label="LinkedIn" icon={<LinkedInIcon />} />
          <SocialCircle href="#" label="X" icon={<XIcon />} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-[#0F2E44] py-4">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 text-center text-[12px] text-[rgba(255,255,255,0.75)]">
          © Copyright 2015 - 2025 | | All Rights Reserved | Global Business Tech
        </div>
      </div>
    </footer>
  );
}

/* ============================
   Small UI bits
============================ */
function Row({ icon, text, center = false }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="w-[22px] h-[22px] flex items-center justify-center text-[rgba(255,255,255,0.75)]">
        {icon}
      </span>
      <span className="leading-relaxed">{text}</span>
    </div>
  );
}

function SocialCircle({ href, label, icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        w-[34px] h-[34px] rounded-full
        bg-[rgba(255,255,255,0.10)]
        flex items-center justify-center
        hover:bg-[rgba(255,255,255,0.16)]
        transition
      "
    >
      <span className="text-[rgba(255,255,255,0.9)]">{icon}</span>
    </a>
  );
}

/* ============================
   Inline SVG Icons
============================ */
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.5 4.18 2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.5 9.5a16 16 0 0 0 6 6l1.17-1.09a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M11 19h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m22 7-10 7L2 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12a8 8 0 0 1-12.2 6.8L4 20l1.2-3.6A8 8 0 1 1 20 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.2c.3-.8.6-.8 1.1-.8.2 0 .4 0 .6.1.2.1.4.3.5.5l.7 1.3c.1.2.1.4 0 .6-.2.4-.5.7-.8 1 .5 1 1.3 1.8 2.3 2.3.3-.3.6-.6 1-.8.2-.1.4-.1.6 0l1.3.7c.2.1.4.3.5.5.1.2.1.4.1.6 0 .5 0 .8-.8 1.1-.5.2-1.6.5-3.3-.2-1.9-.8-3.5-2.4-4.3-4.3-.7-1.7-.4-2.8-.2-3.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Social Icons */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8h2.6l.4-3h-3V9.1c0-.9.2-1.5 1.6-1.5H16V5c-.5-.1-1.5-.2-2.7-.2-2.7 0-4.6 1.6-4.6 4.7V11H6v3h2.7v8h4.8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 7h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 7.7h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 9H3.8v11h2.7V9Zm-.1-3.4a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0ZM10 9h2.6v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V20h-2.7v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H10V9Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.2 8.3L23 22h-6.6l-5.1-6.7L5.7 22H2.6l7.8-9-7.8-11H9.4l4.6 6.1L18.9 2Zm-1.2 18h1.7L8.2 3.9H6.4L17.7 20Z" />
    </svg>
  );
}
