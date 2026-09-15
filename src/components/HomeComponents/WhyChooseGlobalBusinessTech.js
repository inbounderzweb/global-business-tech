import React from 'react'
import Image from 'next/image'

export const WhyChooseGlobalBusinessTech = ({ videoThumb, onPlay }) => {
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Video thumbnail */}
              <button
                type="button"
                onClick={onPlay}
                className="relative w-full h-[260px] sm:h-[320px] lg:h-[300px] rounded-[18px] overflow-hidden shadow-lg"
                aria-label="Play video"
              >
                <Image
                  src={videoThumb}
                  alt="video-thumbnail"
                  fill
                  className="object-cover"
                  priority
                />
    
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/25" />
    
                {/* play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[88px] h-[88px] rounded-full border-[4px] border-white flex items-center justify-center">
                    <div
                      className="ml-1"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "14px solid transparent",
                        borderBottom: "14px solid transparent",
                        borderLeft: "22px solid white",
                      }}
                    />
                  </div>
                </div>
              </button>
    
              {/* Text */}
              <div className="text-white">
                {/* Desktop title */}
                <h2 className="hidden lg:block text-[34px] font-semibold leading-tight text-white/90">
                  Why Choose Global Business Tech?
                </h2>
    
                {/* Mobile title */}
                <h2 className="lg:hidden text-center text-[32px] font-semibold leading-tight text-white/90">
                  Why Choose <br />
                  Global Business Tech ?
                </h2>
    
                <div className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/80 text-center lg:text-left">
                  <b>Proven Expertise. Trusted Execution.</b>
                  <div className="flex gap-12 mt-2 items-center text-left md:text-center">
                    <div>
                      <ul className="list-disc">
                        <li>10+ Years of Industry Experience </li>
                        <li>Presence Across Major Metro Cities</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc">
                        <li>10+ Years of Industry Experience </li>
                        <li>Presence Across Major Metro Cities</li>
                      </ul>
                    </div>
                  </div>
    
    
                </div>
              </div>
            </div>
    </>
  )
}
