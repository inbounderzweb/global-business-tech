"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import downarrow from "../assets/icons/Vector.svg";

function Navigation() {
  const [open, setOpen] = useState(false); // Products
  const [solutionsOpen, setSolutionsOpen] = useState(false); // Solutions

  const productsWrapRef = useRef(null);
  const solutionsWrapRef = useRef(null);

  // ✅ NAV ITEMS (Products + Solutions now have href too)
  const NAV_ITEMS = [
    { label: "Home", type: "link", href: "/" },
    { label: "About Us", type: "link", href: "/about" },
    { label: "Products", type: "products", href: "/products" },
    { label: "Solutions", type: "solutions", href: "/productdetails" }, // or "/collections"
    { label: "Blog", type: "link", href: "/blog" },
    { label: "Contact Us", type: "link", href: "/contact" },
  ];

  const PRODUCT_ITEMS_LEFT = [
    { label: "Poly", href: "/products/poly" },
    { label: "Yamaha", href: "/products/yamaha" },
    { label: "Logitech", href: "/products/logitech" },
    { label: "Knoftel", href: "/products/knoftel" },
  ];
  const PRODUCT_ITEMS_RIGHT = [
    { label: "Cisco", href: "/products/cisco" },
    { label: "Accutone", href: "/products/accutone" },
    { label: "Logic", href: "/products/logic" },
  ];

  const SOLUTIONS_LEFT = [
    { label: "Video Conferencing", href: "/solutions/video-conferencing" },
    { label: "Headsets", href: "/solutions/headsets" },
    { label: "Speakerphones", href: "/solutions/speakerphones" },
    { label: "Cameras", href: "/solutions/cameras" },
  ];
  const SOLUTIONS_RIGHT = [
    { label: "Meeting Rooms", href: "/solutions/meeting-rooms" },
    { label: "Work From Home", href: "/solutions/work-from-home" },
    { label: "Training Rooms", href: "/solutions/training-rooms" },
  ];

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (productsWrapRef.current && !productsWrapRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (solutionsWrapRef.current && !solutionsWrapRef.current.contains(e.target)) {
        setSolutionsOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSolutionsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches;

  const closeAll = () => {
    setOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-l from-[#D5E7F7] to-white py-6 w-full float-end hidden xl:block px-2">
      <div className="flex items-center gap-6 mx-auto justify-end w-[90%]">
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item, index) => {
            // -------- NORMAL LINK --------
            if (item.type === "link") {
              return (
                <li key={index} className="list-none px-2">
                  <Link
                    href={item.href}
                    className="text-[#565656] font-normal"
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            // -------- PRODUCTS (Text is Link, Arrow opens dropdown) --------
            if (item.type === "products") {
              return (
                <li key={index} ref={productsWrapRef} className="relative list-none px-2">
                  <div className="flex items-center gap-2">
                    {/* ✅ Text navigates */}
                    <Link
                      href={item.href}
                      className="text-[#565656] font-normal"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>

                    {/* ✅ Arrow only: hover/click opens dropdown */}
                    <button
                      type="button"
                      aria-label="Open Products menu"
                      aria-haspopup="menu"
                      aria-expanded={open}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen((v) => !v);
                        setSolutionsOpen(false);
                      }}
                      onMouseEnter={() => {
                        if (canHover) setOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (canHover) setOpen(false);
                      }}
                      className="p-1 rounded hover:bg-black/5 transition"
                    >
                      <span
                        className={`block transition-transform duration-300 ease-in-out w-3 ${
                          open ? "scale-y-[-1]" : "scale-y-100"
                        }`}
                      >
                        <Image src={downarrow} alt="down-arrow" />
                      </span>
                    </button>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 top-full z-50 pt-4 transition-all duration-200 ease-out
                      ${
                        open
                          ? "opacity-100 translate-y-0 visible pointer-events-auto"
                          : "opacity-0 -translate-y-2 invisible pointer-events-none"
                      }
                    `}
                    // ✅ keep dropdown open when mouse is over it
                    onMouseEnter={() => {
                      if (canHover) setOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (canHover) setOpen(false);
                    }}
                  >
                    <div className="relative w-[600px] max-w-[calc(100vw-32px)] rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5">
                      {/* caret */}
                      <div className="absolute -top-2 left-24 h-4 w-4 rotate-45 bg-white/95" />

                      <div className="grid grid-cols-2 gap-x-6 px-6 py-4">
                        <div>
                          {PRODUCT_ITEMS_LEFT.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={closeAll}
                              className="flex items-center justify-between py-1 px-2 text-[14px] text-[#565656] border-b border-slate-200/80 rounded-sm hover:bg-[#356DA4] hover:text-white"
                            >
                              <span>{subItem.label}</span>
                              <span className="text-[#356DA4] text-xl">→</span>
                            </Link>
                          ))}
                        </div>

                        <div>
                          {PRODUCT_ITEMS_RIGHT.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={closeAll}
                              className="flex items-center justify-between py-1 px-2 text-[14px] text-[#565656] border-b border-slate-200/80 rounded-sm hover:bg-[#356DA4] hover:text-white"
                            >
                              <span>{subItem.label}</span>
                              <span className="text-[#356DA4] text-xl">→</span>
                            </Link>
                          ))}
                          <div className="py-1 border-b border-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            // -------- SOLUTIONS (same behavior as Products) --------
            if (item.type === "solutions") {
              return (
                <li key={index} ref={solutionsWrapRef} className="relative list-none px-2">
                  <div className="flex items-center gap-2">
                    {/* ✅ Text navigates */}
                    <Link
                      href={item.href}
                      className="text-[#565656] font-normal"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>

                    {/* ✅ Arrow only opens dropdown */}
                    <button
                      type="button"
                      aria-label="Open Solutions menu"
                      aria-haspopup="menu"
                      aria-expanded={solutionsOpen}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSolutionsOpen((v) => !v);
                        setOpen(false);
                      }}
                      onMouseEnter={() => {
                        if (canHover) setSolutionsOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (canHover) setSolutionsOpen(false);
                      }}
                      className="p-1 rounded hover:bg-black/5 transition"
                    >
                      <span
                        className={`block transition-transform duration-300 ease-in-out w-3 ${
                          solutionsOpen ? "scale-y-[-1]" : "scale-y-100"
                        }`}
                      >
                        <Image src={downarrow} alt="down-arrow" />
                      </span>
                    </button>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 top-full z-50 pt-4 transition-all duration-200 ease-out
                      ${
                        solutionsOpen
                          ? "opacity-100 translate-y-0 visible pointer-events-auto"
                          : "opacity-0 -translate-y-2 invisible pointer-events-none"
                      }
                    `}
                    onMouseEnter={() => {
                      if (canHover) setSolutionsOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (canHover) setSolutionsOpen(false);
                    }}
                  >
                    <div className="relative w-[600px] -ml-36 max-w-[calc(100vw-32px)] rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5">
                      <div className="absolute -top-2 left-60 h-4 w-4 rotate-45 bg-white/95" />

                      <div className="grid grid-cols-2 gap-x-6 px-5 py-2">
                        <div>
                          {SOLUTIONS_LEFT.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={closeAll}
                              className="flex items-center justify-between py-1 px-2 text-[14px] text-[#565656] border-b border-slate-200/80 rounded-sm hover:bg-[#356DA4] hover:text-white"
                            >
                              <span>{subItem.label}</span>
                              <span className="text-[#356DA4] text-2xl">→</span>
                            </Link>
                          ))}
                        </div>

                        <div>
                          {SOLUTIONS_RIGHT.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={closeAll}
                              className="flex items-center justify-between py-1 px-2 text-[14px] text-[#565656] border-b border-slate-200/80 rounded-sm hover:bg-[#356DA4] hover:text-white"
                            >
                              <span>{subItem.label}</span>
                              <span className="text-[#356DA4] text-2xl">→</span>
                            </Link>
                          ))}
                          <div className="py-2 border-b border-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            return null;
          })}
        </ul>

        <Link
          href="/profile"
          className="bg-[#356DA4] text-white px-4 py-2 rounded-[50px] xl:w-[172px] h-[40px] border-[1px] border-[#356DA4] font-[manrope] text-[16px] font-thin flex items-center justify-center"
        >
          Download Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
