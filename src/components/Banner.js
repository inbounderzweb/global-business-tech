// ============================
// Banner.js
// ============================
'use client';

import React from 'react';
import BannerSlider from './BannerSlider';

// ✅ Replace these paths with your real images later
import bannerDesktop from '../assets/banner/banner.png';
import bannerMobile from '../assets/banner/mobilebanner.jpg';

function Banner() {
  const slides = [
    {
      id: 1,
      imageUrl: bannerDesktop, // ✅ Desktop image
      mobileImageUrl: bannerMobile, // ✅ Mobile image
      title: 'Powering Your Business with Advanced Technology',
      subtitle:
        'End-to-end AV and IT solutions designed to scale your enterprise and enhance productivity.',
      primaryBtn: 'Our Solutions',
      secondaryBtn: 'Get in Touch',
    },
    {
      id: 2,
      imageUrl: bannerDesktop, // ✅ Desktop image
      mobileImageUrl: bannerMobile, // ✅ Mobile image
      title: 'Strategic Partnerships with Global Tech Leaders',
      subtitle:
        'Delivering industry-leading products from trusted brands like Samsung, Dell, and Cisco.',
      primaryBtn: 'View Products',
      secondaryBtn: 'Partner with Us',
    },
  ];

  return (
    <div>
      <BannerSlider slides={slides} autoPlay interval={5000} />
    </div>
  );
}

export default Banner;
