"use client";

import React from "react";
import Image from "next/image";

import logo from "../assets/logo.svg";
import searchico from "../assets/icons/search.svg";
import callico from "../assets/icons/call.svg";
import menu from "../assets/icons/menu.svg";

import Navigation from "./Navigation";

function Header() {
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:w-[90%] mx-auto items-center">
        {/* Logo + Mobile Menu */}
        <div className="flex justify-between xl:justify-start xl:mt-8 px-2 bg-gradient-to-l from-[#D5E7F7] to-white sm:bg-none items-center">
          <Image
            src={logo}
            alt="gbt-logo"
            className="p-2 w-[150px] md:w-[220px]"
            priority
          />
            
        <div className="block xl:hidden">
            {/* ✅ Show Search + Call from lg and above */}
        <div className="flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <div className="relative w-[150px] sm:w-[356]">
              <input
                type="search"
                placeholder="Search"
                className="
                  w-full h-[30px]
                  bg-[#EEF3F8]
                  rounded-lg
                  pl-2 sm:pl-4 sm:pr-12 pr-6
                  text-[16px] text-[#2C5C8F]
                  placeholder:text-[#7FA1C4]
                  placeholder:text-[14px] sm:text-[18px]
                  border-none outline-none cursor-pointer
                  focus:outline-none focus:ring-0
                  appearance-none
                "
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[#2C5C8F]">
                <Image src={searchico} alt="search-icon" className="w-4 sm:w-6" />
              </div>
            </div>

            <div className="items-center gap-1 cursor-pointer hidden md:flex ">
              <Image src={callico} alt="call-icon" />
              <p className="text-[#3A3A3A] font-[manrope] font-semibold text-[12px] lg:text-[16px] p-2">
                +91 890 4341299
              </p>
            </div>
          </div>
        </div>
        </div>

          {/* ✅ Show ONLY on mobile/tablet (<lg) */}
          <Image
            src={menu}
            alt="mobile-menu"
            className="flex float-end xl:hidden mr-[5px]"
          />
        </div>

        {/* ✅ Show Search + Call from lg and above */}
        <div className="flex-col items-end gap-2 hidden xl:flex">
          <div className="flex items-center gap-4">
            <div className="relative w-[356px]">
              <input
                type="search"
                placeholder="Search"
                className="
                  w-full h-[40px]
                  bg-[#EEF3F8]
                  rounded-lg
                  pl-5 pr-12
                  text-[16px] text-[#2C5C8F]
                  placeholder:text-[#7FA1C4]
                  placeholder:text-[18px]
                  border-none outline-none cursor-pointer
                  focus:outline-none focus:ring-0
                  appearance-none
                "
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C5C8F]">
                <Image src={searchico} alt="search-icon" />
              </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <Image src={callico} alt="call-icon" />
              <p className="text-[#3A3A3A] font-[manrope] font-semibold text-[16px]">
                +91 890 4341299
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Desktop Navigation from lg and above */}
      <Navigation />
    </div>
  );
}

export default Header;
