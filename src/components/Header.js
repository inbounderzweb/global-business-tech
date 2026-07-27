// ============================
// Header.js  (YOUR SAME DESIGN + Mobile Drawer feature added)
// ============================
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/logo.svg';
import searchico from '../assets/icons/search.svg';
import menu from '../assets/icons/menu.svg';

import Navigation from './Navigation';
import MobileMenuDrawer from './MobileMenuDrawer';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close drawer when switching to desktop (xl)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1280px)'); // xl
    const onChange = () => {
      if (mq.matches) {
        setDrawerOpen(false);
        setIsSearchOpen(false);
      }
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <div className="fixed top-0 bg-white z-100 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:w-[90%] mx-auto items-center">
        {/* Main Header Row */}
        <div className="flex justify-between xl:justify-start bg-linear-to-l from-[#D5E7F7] to-white sm:bg-none items-center h-[64px] md:h-[80px] px-2 relative z-110">
          <Link href="/">
            <Image
              src={logo}
              alt="gbt-logo"
              className="p-1 w-[150px] md:w-[220px]"
              priority
            />
          </Link>

          {/* Mobile Right Controls - Search + Menu */}
          <div className="flex items-center gap-1 xl:hidden">
            {/* Search Toggle Button */}
            <button 
              type="button" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#2C5C8F] transition-transform active:scale-95"
              aria-label="Toggle search"
            >
              {isSearchOpen ? (
                <span className="text-3xl font-light leading-none">×</span>
              ) : (
                <Image src={searchico} alt="search" className="w-5 h-5" />
              )}
            </button>

            {/* Menu Icon */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="p-2 transition-transform active:scale-95"
            >
              <Image src={menu} alt="mobile-menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Smart Slide-down Search Bar (Mobile only) */}
        <div className={`
          xl:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-[#B9D0E6] bg-[#F8FAFC]
          ${isSearchOpen ? 'max-h-[60px] opacity-100 py-2 px-4 shadow-sm' : 'max-h-0 opacity-0'}
        `}>
          <div className="relative w-full">
            <input
              type="search"
              placeholder="What are you looking for?"
              autoFocus={isSearchOpen}
              className="
                w-full h-[40px]
                bg-[#EEF3F8]
                rounded-lg
                pl-4 pr-10
                text-[14px] text-[#2C5C8F]
                placeholder:text-[#7FA1C4]
                border border-[#B9D0E6] outline-none
                focus:ring-2 focus:ring-[#356DA4]/10
              "
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <Image src={searchico} alt="search" className="w-4 h-4" />
            </div>
          </div>
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


          </div>
        </div>
      </div>

      {/* ✅ Desktop Navigation from lg and above */}
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
