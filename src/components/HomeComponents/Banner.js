// ============================
// Banner.js
// ============================
"use client";

import React from "react";
import BannerSlider from "./BannerSlider";

// ✅ Replace these paths with your real images later
import bannerDesktop from "../../assets/banner/banner.png";
import bannerMobile from "../../assets/banner/mobilebanner.jpg";

function Banner() {
  const slides = [
    {
      id: 1,
      imageUrl: bannerDesktop,        // ✅ Desktop image
      mobileImageUrl: bannerMobile,   // ✅ Mobile image
      title: "One Stop Solution Provider For all your AV & IT Requirements ",
      subtitle:
        "We deliver integrated Audio-Visual and IT infrastructure solutions designed to power modern businesses.",
      primaryBtn: "Request a Consultation",
      secondaryBtn: "Talk to an Expert",
    },
    {
      id: 2,
      imageUrl: bannerDesktop,        // ✅ Desktop image
      mobileImageUrl: bannerMobile,   // ✅ Mobile image
      title: "Lorem ipsum dolor sit amet, consectetuer",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy volutpat.",
      primaryBtn: "Know More",
      secondaryBtn: "Get In Touch",
    },
  ];

  return (
    <div>
      <BannerSlider slides={slides} autoPlay interval={10000} />
    </div>
  );
}

export default Banner;
