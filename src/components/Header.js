// ============================
// Header.js  (YOUR SAME DESIGN + Mobile Drawer feature added)
// ============================
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/logo.svg';
import searchico from '../assets/icons/search.svg';
import callico from '../assets/icons/call.svg';
import menu from '../assets/icons/menu.svg';

import Navigation from './Navigation';
import MobileMenuDrawer from './MobileMenuDrawer';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when switching to desktop (xl)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1280px)'); // xl
    const onChange = () => {
      if (mq.matches) setDrawerOpen(false);
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <div className="fixed top-0 bg-white z-100 w-full">
      {/* ✅ Top info bar (xl+): tagline left, phone number right */}
      <div className="hidden xl:block bg-[#12395C] text-white">
        <div className="flex items-center justify-between w-[90%] mx-auto py-2">
          <p className="text-[13px] tracking-wide text-white/90">
            Empowering Workspaces with Smart Technology
          </p>
          <a
            href="tel:+918904341299"
            className="flex items-center gap-2 text-[13px] text-white/90 hover:text-white transition-colors"
          >
            <Image src={callico} alt="call-icon" className="w-4 h-4 brightness-0 invert" />
            +91 890 4341299
          </a>
        </div>
      </div>

      {/* ✅ Mobile/Tablet header row — desktop (xl+) uses the logo/search/download built into Navigation */}
      <div className="grid grid-cols-1 xl:hidden w-full items-center">
        {/* Logo + Mobile Menu */}
        <div className="flex justify-between bg-linear-to-l from-[#D5E7F7] to-white sm:bg-none items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="gbt-logo"
              className="p-2 w-[180px] md:w-[220px]"
              priority
            />
          </Link>
          <div className="block xl:hidden">
            {/* ✅ Show Search + Call from lg and above */}
            <div className="flex-col items-end gap-2">
              <div className="flex items-center gap-4">
                <div className="relative w-[140px] sm:w-[356] -ml-2">
                  <input
                    type="search"
                    placeholder="Search"
                    className="
                      w-full h-[30px] 
                      bg-[#EEF3F8]
                      rounded-lg
                      pl-2 sm:pl-4 sm:pr-12 pr-6
                      text-[14px] text-[#2C5C8F]
                      placeholder:text-[#7FA1C4]
                      placeholder:text-[14px] sm:text-[18px]
                      border-none outline-none cursor-pointer
                      focus:outline-none focus:ring-0
                      appearance-none
                    "
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[#2C5C8F]">
                    <Image
                      src={searchico}
                      alt="search-icon"
                      className="w-4 sm:w-6"
                    />
                  </div>
                </div>

                <div className="items-center gap-1 cursor-pointer hidden lg:flex ">
                  {/* <Image src={callico} alt="call-icon" /> */}
                  <p className="text-[#565656] text-[16px] p-2">
                    +91 890 4341299
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Mobile Menu Icon (NO DESIGN CHANGE, only added onClick + button wrapper) */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex float-end xl:hidden mr-[12px]"
          >
            <Image src={menu} alt="mobile-menu" className="w-6" />
          </button>
        </div>
      </div>

      {/* ✅ Desktop Navigation (xl+) — includes logo, search, phone, and download */}
      <Navigation />

      {/* ✅ Mobile Drawer */}
      <MobileMenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default Header;
