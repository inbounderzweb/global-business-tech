// ============================
// MobileMenuDrawer.js  (Fixed 340x510 + scroll + smaller fonts/spaces)
// ============================
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo.svg";

export default function MobileMenuDrawer({ open, onClose }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const NAV = useMemo(
    () => ({
      products: [
        { label: "Poly", href: "/products/poly" },
        { label: "Yamaha", href: "/products/yamaha" },
        { label: "Logitech", href: "/products/logitech" },
        { label: "Knoftel", href: "/products/knoftel" },
        { label: "Cisco", href: "/products/cisco" },
        { label: "Accutone", href: "/products/accutone" },
        { label: "Logic", href: "/products/logic" },
      ],
      solutions: [
        { label: "Video Conferencing", href: "/solutions/video-conferencing" },
        { label: "Headsets", href: "/solutions/headsets" },
        { label: "Speakerphones", href: "/solutions/speakerphones" },
        { label: "Cameras", href: "/solutions/cameras" },
        { label: "Meeting Rooms", href: "/solutions/meeting-rooms" },
        { label: "Work From Home", href: "/solutions/work-from-home" },
        { label: "Training Rooms", href: "/solutions/training-rooms" },
      ],
    }),
    []
  );

  const go = () => onClose?.();

  // lock scroll while drawer open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // reset dropdowns when drawer closes
  useEffect(() => {
    if (!open) {
    //   setProductsOpen(false);
    //   setSolutionsOpen(false);
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[9998] bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer wrapper (centered on screen) */}
      <aside
        className={`
          fixed inset-0 z-[9999]
          flex items-start justify-center
          pt-4
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
        aria-hidden={!open}
      >
        {/* FIXED PANEL */}
        <div
          className="
            w-[340px] h-[510px]
            bg-[#EEF3F8]
            rounded-[36px]
            shadow-xl
            overflow-hidden
            relative
          "
        >
          {/* Header area (logo + close) */}
          <div className="flex items-start justify-between px-5 pt-5 pb-3">
            <Image src={logo} alt="logo" className="w-[58px] h-auto" priority />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="text-[#2C5C8F] text-3xl leading-none -mt-1"
            >
              ×
            </button>
          </div>

          {/* Scrollable Menu Area */}
          <div
            className="
              px-5 pb-5
              h-[calc(510px-80px)]
              overflow-y-auto
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* Items */}
            <div className="text-center">
              {/* helper classes: smaller font + tighter spacing */}
              <Link
                href="/"
                onClick={go}
                className="block text-[22px] text-[#565656] py-3"
              >
                Home
              </Link>
              <div className="h-[1px] bg-[#cbd5e1]" />

              <Link
                href="/about"
                onClick={go}
                className="block text-[22px] text-[#565656] py-3"
              >
                About Us
              </Link>
              <div className="h-[1px] bg-[#cbd5e1]" />

              {/* Products */}
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                className="w-full flex items-center justify-center gap-2 text-[24px] font-semibold text-[#565656] py-3"
                aria-expanded={productsOpen}
              >
                Products
                <span className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              <div className="h-[1px] bg-[#cbd5e1]" />

              {productsOpen && (
                <div className="py-2 space-y-2">
                  {NAV.products.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      onClick={go}
                      className="block text-[16px] text-[#565656] py-1"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Solutions */}
              <button
                type="button"
                onClick={() => setSolutionsOpen((v) => !v)}
                className="w-full flex items-center justify-center gap-2 text-[24px] font-semibold text-[#565656] py-3"
                aria-expanded={solutionsOpen}
              >
                Solutions
                <span className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              <div className="h-[1px] bg-[#cbd5e1]" />

              {solutionsOpen && (
                <div className="py-2 space-y-2">
                  {NAV.solutions.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      onClick={go}
                      className="block text-[16px] text-[#565656] py-1"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/blog"
                onClick={go}
                className="block text-[22px] text-[#565656] py-3"
              >
                Blog
              </Link>
              <div className="h-[1px] bg-[#cbd5e1]" />

              <Link
                href="/contact"
                onClick={go}
                className="block text-[22px] text-[#565656] py-3"
              >
                Contact us
              </Link>

              {/* Button */}
              <div className="pt-5 pb-2 flex justify-center">
                <Link
                  href="/profile"
                  onClick={go}
                  className="
                    inline-flex items-center justify-center
                    bg-[#356DA4] text-white
                    w-[260px]
                    py-3 rounded-full
                    text-[20px]
                  "
                >
                  Download Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
