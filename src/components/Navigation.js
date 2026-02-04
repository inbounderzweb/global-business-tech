"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import downarrow from "../assets/icons/Vector.svg";

function Navigation() {
  const [open, setOpen] = useState(false); // Products
  const [solutionsOpen, setSolutionsOpen] = useState(false); // Solutions

  const dropdownRef = useRef(null);
  const solutionsDropdownRef = useRef(null);

  // ✅ NAV ITEMS ARRAY
  const NAV_ITEMS = [
    { label: "Home", type: "link" },
    { label: "About Us", type: "link" },
    { label: "Products", type: "products" },
    { label: "Solutions", type: "solutions" },
    { label: "Blog", type: "link" },
    { label: "Contact Us", type: "link" },
  ];

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (
        solutionsDropdownRef.current &&
        !solutionsDropdownRef.current.contains(e.target)
      ) {
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

  return (
    <nav className="bg-gradient-to-l from-[#D5E7F7] to-white py-6 w-full xl:w-[90%] float-end hidden xl:block px-2">
      <div className="flex items-center gap-6 mx-auto justify-end w-[90%]">
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item, index) => {
            // -------- NORMAL LINK --------
            if (item.type === "link") {
              return (
                <li key={index} className="list-none px-2">
                  <a href="#" className="text-[#565656] font-normal">
                    {item.label}
                  </a>
                </li>
              );
            }

            // -------- PRODUCTS DROPDOWN --------
            if (item.type === "products") {
              return (
                <li
                  key={index}
                  ref={dropdownRef}
                  className="relative list-none px-2"
                  onMouseEnter={() => {
                    if (canHover) setOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (canHover) setOpen(false);
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((v) => !v);
                      setSolutionsOpen(false);
                    }}
                    className="flex items-center gap-2 text-[#565656]"
                    aria-haspopup="menu"
                    aria-expanded={open}
                  >
                    {item.label}
                    <span
                      className={`transition-transform duration-300 ease-in-out text-[#565656] w-3 ${
                        open ? "scale-y-[-1]" : "scale-y-100"
                      }`}
                    >
                      <Image src={downarrow} alt="down-arrow" />
                    </span>
                  </button>

                  {/* ✅ Dropdown aligned like your screenshot (grows to right) */}
                 <div
  className={`absolute left-0 top-full z-50 pt-4 transition-all duration-200 ease-out
    ${open ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-2 invisible pointer-events-none"}
  `}
>
                    <div className="relative w-[600px] max-w-[calc(100vw-32px)] rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5">
                      {/* caret stays near button */}
                      <div className="absolute -top-2 left-21 h-4 w-4 rotate-45 bg-white/95" />

                      <div className="grid grid-cols-2 gap-x-6 px-6 py-4">
                        {/* Left column */}
                        <div>
                          {["Poly", "Yamaha", "Logitech", "Knoftel"].map(
                            (subItem) => (
                              <a
                                key={subItem}
                                href="#"
                                className="flex items-center justify-between py-1 px-1 text-[14px] text-[#565656] border-b border-slate-200/80 rounded-sm hover:bg-[#356DA4] hover:text-white"
                              >
                                <span>{subItem}</span>
                                <span className="text-[#356DA4] hover:text-white text-xl">
                                  →
                                </span>
                              </a>
                            )
                          )}
                        </div>

                        {/* Right column */}
                        <div>
                          {["Cisco", "Accutone", "Logic"].map((subItem) => (
                            <a
                              key={subItem}
                              href="#"
                              className="flex items-center justify-between py-1 text-[14px] text-[#565656] border-b border-slate-200/80"
                            >
                              <span>{subItem}</span>
                              <span className="text-[#356DA4] text-xl">
                                →
                              </span>
                            </a>
                          ))}
                          <div className="py-1 border-b border-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            // -------- SOLUTIONS DROPDOWN --------
            if (item.type === "solutions") {
              return (
                <li
                  key={index}
                  ref={solutionsDropdownRef}
                  className="relative list-none px-2"
                  onMouseEnter={() => {
                    if (canHover) setSolutionsOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (canHover) setSolutionsOpen(false);
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSolutionsOpen((v) => !v);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 text-[#565656]"
                    aria-haspopup="menu"
                    aria-expanded={solutionsOpen}
                  >
                    {item.label}
                    <span
                      className={`transition-transform duration-300 ease-in-out text-[#565656] w-3 ${
                        solutionsOpen ? "scale-y-[-1]" : "scale-y-100"
                      }`}
                    >
                      <Image src={downarrow} alt="down-arrow" />
                    </span>
                  </button>

                  {/* ✅ Same alignment logic as Products */}
                <div
  className={`absolute left-0 top-full z-50 pt-4 transition-all duration-200 ease-out
    ${solutionsOpen ? "opacity-100 translate-y-0 visible pointer-events-auto"
                   : "opacity-0 -translate-y-2 invisible pointer-events-none"}
  `}
>
                    <div className="relative w-[600px] -ml-36 max-w-[calc(100vw-32px)] rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5">
                      <div className="absolute -top-2 left-58 h-4 w-4 rotate-45 bg-white/95" />

                      <div className="grid grid-cols-2 gap-x-6 px-5 py-2">
                        <div>
                          {[
                            "Video Conferencing",
                            "Headsets",
                            "Speakerphones",
                            "Cameras",
                          ].map((subItem) => (
                            <a
                              key={subItem}
                              href="#"
                              className="flex items-center justify-between py-1 text-[14px] text-[#565656] border-b border-slate-200/80"
                            >
                              <span>{subItem}</span>
                              <span className="text-[#356DA4] text-2xl">
                                →
                              </span>
                            </a>
                          ))}
                        </div>

                        <div>
                          {[
                            "Meeting Rooms",
                            "Work From Home",
                            "Training Rooms",
                          ].map((subItem) => (
                            <a
                              key={subItem}
                              href="#"
                              className="flex items-center justify-between py-1 text-[14px] text-[#565656] border-b border-slate-200/80"
                            >
                              <span>{subItem}</span>
                              <span className="text-[#356DA4] text-2xl">
                                →
                              </span>
                            </a>
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

        <button className="bg-[#356DA4] text-white px-4 py-1 rounded-[50px] w-full xl:w-[172px] h-[40] border-[1px] font-[manrope] text-[16px] border-[#356DA4] font-thin">
          Download Profile
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
