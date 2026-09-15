// ============================
// RevealOnScroll.js
// ============================
'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    // Plain scroll-position check instead of IntersectionObserver: an
    // instant jump (scrollbar drag, End key, anchor link) can move a
    // section from 0% visible straight to 0% visible on the other side
    // without ever crossing an intersection threshold, so the observer
    // never fires again and the section stays stuck at opacity-0.
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setVisible(true);
      }
    };

    check();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {children}
    </div>
  );
}
