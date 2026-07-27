// ============================
// FooterSection.jsx
// Next.js + Tailwind (Improved layout for multiple India addresses)
// ============================
"use client";

import React, { useState } from "react";
import Image from "next/image";
// import Link from "next/link";

/**
 * ✅ Replace these imports with your exported Figma assets
 * Put them inside /src/assets/footer/ (or your preferred folder)
 */
import logo from "../assets/footer/logo.svg";
import indiaFlag from "../assets/footer/india.svg";

export default function FooterSection() {


  const indiaLocations = [
    {
      city: "Bangalore",
      isCorporateOffice: true,
      lines: [
        "1, 9th Cross Road,",
        "Swimming Pool Extension, HN Layout,",
        "Malleshwaram, Bengaluru, Karnataka 560003,",
      ],
    },
    {
      city: "Hyderabad",
      lines: [
        "Ground Floor,",
        "Opp. Mandapats Hanumanth Rao Girls High School,",
        "Venkateshwara Colony, King Koti, Narayanguda,",
        "Hyderabad, Telangana 500029",
      ],
    },
    {
      city: "Chennai",
      lines: [
        "#123B, Ramalinga Nagar Main Road,",
        "Sivaprakasam Nagar, Puzhuthivakkam,",
        "Chennai - 600 091",
      ],
    },
    {
      city: "Mumbai",
      lines: [
        "Office No.10, Sagar Complex Bldg1,",
        "Jesal Park, Bhayandar East,",
        "Thane 401105",
      ],
    },
  ];


  return (
    <footer className="w-full bg-[#163A55] text-white">
      {/* Top content */}
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-10 md:py-12">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-12 gap-10 items-start">
          {/* Col 1: Logo */}
          <div className="col-span-3">
            <div className="flex items-start gap-4">
              <div className="relative w-[240px] h-[240px] shrink-0">
                <Image src={logo} alt="Global Business Tech" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Col 2-6: India (improved as scrollable list with cards) */}
          <div className="col-span-6">
            <SectionHeader
              flag={indiaFlag}
              flagAlt="India"
              title="INDIA"
              subtitle="(Head Quarter)"
            />

            {/* Two-column cards inside India for better density */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {indiaLocations.map((loc) => (
                <AddressCard 
                  key={loc.city} 
                  title={loc.city} 
                  lines={loc.lines} 
                  isCorporateOffice={loc.isCorporateOffice} 
                />
              ))}
            </div>
          </div>

          {/* Col 10-12: Contact */}
          <div className="col-span-3">
            <div className="text-[14px] font-medium mb-4 text-[rgba(255,255,255,0.9)]">
              CONTACT DETAILS
            </div>

            <div className="space-y-3 text-[13px] text-[rgba(255,255,255,0.78)]">
              <Row icon={<PhoneIcon />} text="+91 80 23660415" />
              <Row icon={<MobileIcon />} text="+91 8904341299 | +91 9739919398" />
              <Row icon={<MailIcon />} text="Info@globalbusinesstech.in" />
              <Row icon={<WhatsappIcon />} text="+91 8904341299" />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-[190px] h-[190px]">
              <Image src={logo} alt="Global Business Tech" fill className="object-contain" />
            </div>
          </div>

          {/* India (accordion style for many cities) */}
          <div className="mt-8">
            <SectionHeaderMobile flag={indiaFlag} flagAlt="India" title="INDIA (Head Quarter)" />
            <div className="mt-4 space-y-3">
              {indiaLocations.map((loc) => (
                <AccordionAddress 
                  key={loc.city} 
                  title={loc.city} 
                  lines={loc.lines} 
                  isCorporateOffice={loc.isCorporateOffice} 
                />
              ))}
            </div>
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



        {/* Social Icons */}
        <div className="mt-8 flex items-center gap-6 justify-center md:justify-end">
          <SocialCircle href="https://www.facebook.com/globalbusinesstech1/" label="Facebook" icon={<FacebookIcon />} />
          <SocialCircle href="https://www.linkedin.com/company/global-business-tech-pvt-ltd?originalSubdomain=in" label="LinkedIn" icon={<LinkedInIcon />} />
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
   Helpers
============================ */
function SectionHeader({ flag, flagAlt, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[30px] h-[20px]">
        <Image src={flag} alt={flagAlt} fill className="object-cover rounded-[2px]" />
      </div>
      <div className="text-[14px] font-medium text-[rgba(255,255,255,0.9)] tracking-wide">
        {title}{" "}
        {subtitle ? (
          <span className="text-[rgba(255,255,255,0.72)] font-medium">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}

function SectionHeaderMobile({ flag, flagAlt, title }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[36px] h-[24px]">
        <Image src={flag} alt={flagAlt} fill className="object-cover rounded-[2px]" />
      </div>
      <div className="mt-3 text-[14px] font-medium text-[rgba(255,255,255,0.9)]">
        {title}
      </div>
    </div>
  );
}
function AddressCard({ title, lines, isCorporateOffice = false }) {
  return (
    <div
      className="rounded-[14px] bg-[rgba(255,255,255,0.08)] p-4 backdrop-blur-[1px]"
    >
      {title ? (
        <div className="flex items-center gap-2 mb-2">
          {!isCorporateOffice && (
            <span className="text-[rgba(255,255,255,0.6)]">
              <MapPinIcon size={14} />
            </span>
          )}
          <p className="text-white text-[14px] font-semibold">
            {title}
            {isCorporateOffice && (
              <span className="ml-2 text-[9px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.15)] px-1.5 py-0.5 rounded-[4px] text-white">
                Corporate Office
              </span>
            )}
          </p>
        </div>
      ) : null}
      <p className="text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)]">
        {lines.map((l, idx) => (
          <React.Fragment key={idx}>
            {l}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

function AccordionAddress({ title, lines, isCorporateOffice = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[360px] rounded-[14px] bg-[rgba(255,255,255,0.08)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          {!isCorporateOffice && (
            <span className="text-[rgba(255,255,255,0.6)]">
              <MapPinIcon size={14} />
            </span>
          )}
          <span className="text-[14px] font-semibold text-white">
            {title}
            {isCorporateOffice && (
              <span className="ml-2 text-[9px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.15)] px-1.5 py-0.5 rounded-[4px] text-white">
                Corporate Office
              </span>
            )}
          </span>
        </div>
        <span
          className={[
            "transition-transform duration-200 text-[rgba(255,255,255,0.85)]",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        className={[
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden px-4 pb-4">
          <p className="text-[13px] leading-relaxed text-[rgba(255,255,255,0.78)] text-left">
            {lines.map((l, idx) => (
              <React.Fragment key={idx}>
                {l}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text, center = false }) {
  return (
    <div className={`flex items-start gap-3 ${center ? "justify-center" : ""}`}>
      <span className="w-[22px] h-[22px] flex items-center justify-center text-[rgba(255,255,255,0.75)] mt-[2px]">
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
function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
function MapPinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8h2.6l.4-3h-3V9.1c0-.9.2-1.5 1.6-1.5H16V5c-.5-.1-1.5-.2-2.7-.2-2.7 0-4.6 1.6-4.6 4.7V11H6v3h2.7v8h4.8Z" />
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