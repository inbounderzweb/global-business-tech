// ============================
// AboutSection.js
// ============================
"use client";

import React from "react";
import abtimg from '../../assets/aboutimg.jpg'
import { AboutGlobalBusinessTech } from "./AboutGlobalBusinessTech";
import videoThumb from "../../assets/banner/banner.png";
import { WhyChooseGlobalBusinessTech } from "./WhyChooseGlobalBusinessTech";

function AboutSection({
  imageSrc = abtimg,
  heading,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <section className="w-full bg-[#2C5C8F] py-10 lg:py-20 lg:mt-6">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        {/* <AboutGlobalBusinessTech
          imageSrc={imageSrc}
          heading={heading}
          description={description}
          buttonText={buttonText}
          onButtonClick={onButtonClick}
        /> */}
        <WhyChooseGlobalBusinessTech
          videoThumb={videoThumb}
          onPlay={() => setOpen(true)}
        />
      </div>
    </section>
  );
}

export default AboutSection;
