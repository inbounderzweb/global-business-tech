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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full xl:w-[80%] mx-auto items-center">
        <div className="flex justify-between lg:justify-start xl:mt-8 px-2 bg-gradient-to-l from-[#D5E7F7] to-white lg:bg-none">
          <Image
            src={logo}
            alt="gbt-logo"
            className="p-2"
            width={200}
            height={100}
            priority
          />
          <Image
            src={menu}
            alt="mobile-menu"
            className="flex justify-end text-right float-end lg:hidden"
          />
        </div>

        <div className="flex-col items-end gap-2 hidden lg:flex">
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

            <div className="hidden xl:flex items-center gap-2 cursor-pointer">
              <Image src={callico} alt="call-icon" />
              <p className="text-[#3A3A3A] font-[manrope] font-semibold text-[16px]">
                +91 890 4341299
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation />
    </div>
  );
}

export default Header;
