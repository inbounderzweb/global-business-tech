import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const AboutGlobalBusinessTech = ({
  imageSrc,
  heading = "About Global Business Tech",
  description = `Global Business Tech is a trusted AV and IT solutions provider with over 10 years of expertise delivering turnkey technology projects across major metro cities in India.
We help businesses design, deploy, and manage robust technology ecosystems. From communication systems and secure access control to enterprise-grade networking and storage solutions.
With 200+ satisfied clients, 100+ turnkey projects, and 20+ certifications, we combine technical excellence with reliable service support.`,
  buttonText = "Read more",
  onButtonClick,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left Image */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] rounded-[18px] overflow-hidden">
        <Image
          src={imageSrc}
          alt="about-image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="px-1 lg:px-6">
        <h2 className="text-[#356DA4] font-semibold leading-tight text-[34px] sm:text-[42px]">
          {heading}
        </h2>

        <p className="text-[#3A3A3A] mt-4 text-[14px] sm:text-[16px] leading-relaxed max-w-[620px] whitespace-pre-line">
          {description}
        </p>
        <Link href="/about">
          <button
            type="button"
            onClick={onButtonClick}
            className="mt-8 bg-[#356DA4] hover:bg-[#2d5c8b] transition text-white px-10 py-3 rounded-full text-[16px]"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  )
}
