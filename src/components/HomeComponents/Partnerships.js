// ============================
// Partnerships.js
// ============================
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
// LOGO IMPORTS
// Networking
import networking_0 from '../../assets/clientlogos/Networking/Networking.png';
import networking_1 from '../../assets/clientlogos/Networking/Networking-1.png';
import networking_2 from '../../assets/clientlogos/Networking/Networking-2.png';
import networking_3 from '../../assets/clientlogos/Networking/Networking-3.png';

// Networking Passive
import networking_passive_0 from '../../assets/clientlogos/Networkingpassive/Networking Passive.png';
import networking_passive_1 from '../../assets/clientlogos/Networkingpassive/Networking Passive-1.png';
import networking_passive_2 from '../../assets/clientlogos/Networkingpassive/Networking Passive-2.png';
import networking_passive_3 from '../../assets/clientlogos/Networkingpassive/Networking Passive-3.png';
import networking_passive_4 from '../../assets/clientlogos/Networkingpassive/Networking Passive-4.png';

// Audio Video
import audio_video_0 from '../../assets/clientlogos/audiovideo/Audio Video.png';
import audio_video_1 from '../../assets/clientlogos/audiovideo/Audio Video-1.png';
import audio_video_2 from '../../assets/clientlogos/audiovideo/Audio Video-2.png';
import audio_video_3 from '../../assets/clientlogos/audiovideo/Audio Video-3.png';
import audio_video_4 from '../../assets/clientlogos/audiovideo/Audio Video-4.png';
import audio_video_5 from '../../assets/clientlogos/audiovideo/Audio Video-5.png';
import audio_video_6 from '../../assets/clientlogos/audiovideo/Audio Video-6.png';
import audio_video_7 from '../../assets/clientlogos/audiovideo/Audio Video-7.png';
import audio_video_8 from '../../assets/clientlogos/audiovideo/Audio Video-8.png';
import audio_video_9 from '../../assets/clientlogos/audiovideo/Audio Video-9.png';
import audio_video_10 from '../../assets/clientlogos/audiovideo/Audio Video-10.png';
import audio_video_11 from '../../assets/clientlogos/audiovideo/Audio Video-11.png';
import audio_video_12 from '../../assets/clientlogos/audiovideo/Audio Video-12.png';
import audio_video_13 from '../../assets/clientlogos/audiovideo/Audio Video-13.png';
import audio_video_14 from '../../assets/clientlogos/audiovideo/Audio Video-14.png';

// PC Computing
import pc_computing_0 from '../../assets/clientlogos/pccomputing/PC Computing.png';
import pc_computing_1 from '../../assets/clientlogos/pccomputing/PC Computing-1.png';
import pc_computing_2 from '../../assets/clientlogos/pccomputing/PC Computing-2.png';
import pc_computing_3 from '../../assets/clientlogos/pccomputing/PC Computing-3.png';
import pc_computing_4 from '../../assets/clientlogos/pccomputing/PC Computing-4.png';
import pc_computing_5 from '../../assets/clientlogos/pccomputing/PC Computing-5.png';

// Server and Storage
import server_storage_0 from '../../assets/clientlogos/serverandstorage/Server and Storage.png';
import server_storage_1 from '../../assets/clientlogos/serverandstorage/Server and Storage-1.png';
import server_storage_2 from '../../assets/clientlogos/serverandstorage/Server and Storage-2.png';
import server_storage_3 from '../../assets/clientlogos/serverandstorage/Server and Storage-3.png';
import server_storage_4 from '../../assets/clientlogos/serverandstorage/Server and Storage-4.png';

// Surveillance
import surveillance_0 from '../../assets/clientlogos/surveillance/Surveillance.png';
import surveillance_1 from '../../assets/clientlogos/surveillance/Surveillance-1.png';
import surveillance_2 from '../../assets/clientlogos/surveillance/Surveillance-2.png';

// Enterprise Security
import enterprise_security_0 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security.png';
import enterprise_security_1 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-1.png';
import enterprise_security_2 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-2.png';
import enterprise_security_3 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-3.png';
import enterprise_security_4 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-4.png';
import enterprise_security_5 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-5.png';
import enterprise_security_6 from '../../assets/clientlogos/enterprisesecurity/Enterprise Security-6.png';

// Display Solution
import display_solution_0 from '../../assets/clientlogos/displaysolution/Display Solution.png';
import display_solution_1 from '../../assets/clientlogos/displaysolution/Display Solution-1.png';
import display_solution_2 from '../../assets/clientlogos/displaysolution/Display Solution-2.png';
import display_solution_3 from '../../assets/clientlogos/displaysolution/Display Solution-3.png';
import display_solution_4 from '../../assets/clientlogos/displaysolution/Display Solution-4.png';
import display_solution_5 from '../../assets/clientlogos/displaysolution/Display Solution-5.png';

// Enterprise Software
import enterprise_software_0 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software.png';
import enterprise_software_1 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software-1.png';
import enterprise_software_2 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software-2.png';
import enterprise_software_3 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software-3.png';
import enterprise_software_4 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software-4.png';
import enterprise_software_5 from '../../assets/clientlogos/enterprisesoftware/Enterprise Software-5.png';

function Partnerships() {
  const filterScrollerRef = useRef(null);

  const filters = useMemo(
    () => [
      'All',
      'Networking',
      'Networking Passive',
      'Audio Video',
      'PC Computing',
      'Server and Storage',
      'Surveillance',
      'Enterprise Security',
      'Display Solution',
      'Enterprise Software'
    ],
    []
  );

  const partners = useMemo(
    () => [
      // Networking
      { id: "nw0", name: "Networking", logoSrc: networking_0, categories: ["Networking"] },
      { id: "nw1", name: "Networking 1", logoSrc: networking_1, categories: ["Networking"] },
      { id: "nw2", name: "Networking 2", logoSrc: networking_2, categories: ["Networking"] },
      { id: "nw3", name: "Networking 3", logoSrc: networking_3, categories: ["Networking"] },

      // Networking Passive
      { id: "nwp0", name: "Networking Passive", logoSrc: networking_passive_0, categories: ["Networking Passive"] },
      { id: "nwp1", name: "Networking Passive 1", logoSrc: networking_passive_1, categories: ["Networking Passive"] },
      { id: "nwp2", name: "Networking Passive 2", logoSrc: networking_passive_2, categories: ["Networking Passive"] },
      { id: "nwp3", name: "Networking Passive 3", logoSrc: networking_passive_3, categories: ["Networking Passive"] },
      { id: "nwp4", name: "Networking Passive 4", logoSrc: networking_passive_4, categories: ["Networking Passive"] },

      // Audio Video
      { id: "av0", name: "Audio Video", logoSrc: audio_video_0, categories: ["Audio Video"] },
      { id: "av1", name: "Audio Video 1", logoSrc: audio_video_1, categories: ["Audio Video"] },
      { id: "av2", name: "Audio Video 2", logoSrc: audio_video_2, categories: ["Audio Video"] },
      { id: "av3", name: "Audio Video 3", logoSrc: audio_video_3, categories: ["Audio Video"] },
      { id: "av4", name: "Audio Video 4", logoSrc: audio_video_4, categories: ["Audio Video"] },
      { id: "av5", name: "Audio Video 5", logoSrc: audio_video_5, categories: ["Audio Video"] },
      { id: "av6", name: "Audio Video 6", logoSrc: audio_video_6, categories: ["Audio Video"] },
      { id: "av7", name: "Audio Video 7", logoSrc: audio_video_7, categories: ["Audio Video"] },
      { id: "av8", name: "Audio Video 8", logoSrc: audio_video_8, categories: ["Audio Video"] },
      { id: "av9", name: "Audio Video 9", logoSrc: audio_video_9, categories: ["Audio Video"] },
      { id: "av10", name: "Audio Video 10", logoSrc: audio_video_10, categories: ["Audio Video"] },
      { id: "av11", name: "Audio Video 11", logoSrc: audio_video_11, categories: ["Audio Video"] },
      { id: "av12", name: "Audio Video 12", logoSrc: audio_video_12, categories: ["Audio Video"] },
      { id: "av13", name: "Audio Video 13", logoSrc: audio_video_13, categories: ["Audio Video"] },
      { id: "av14", name: "Audio Video 14", logoSrc: audio_video_14, categories: ["Audio Video"] },

      // PC Computing
      { id: "pc0", name: "PC Computing", logoSrc: pc_computing_0, categories: ["PC Computing"] },
      { id: "pc1", name: "PC Computing 1", logoSrc: pc_computing_1, categories: ["PC Computing"] },
      { id: "pc2", name: "PC Computing 2", logoSrc: pc_computing_2, categories: ["PC Computing"] },
      { id: "pc3", name: "PC Computing 3", logoSrc: pc_computing_3, categories: ["PC Computing"] },
      { id: "pc4", name: "PC Computing 4", logoSrc: pc_computing_4, categories: ["PC Computing"] },
      { id: "pc5", name: "PC Computing 5", logoSrc: pc_computing_5, categories: ["PC Computing"] },

      // Server and Storage
      { id: "ss0", name: "Server and Storage", logoSrc: server_storage_0, categories: ["Server and Storage"] },
      { id: "ss1", name: "Server and Storage 1", logoSrc: server_storage_1, categories: ["Server and Storage"] },
      { id: "ss2", name: "Server and Storage 2", logoSrc: server_storage_2, categories: ["Server and Storage"] },
      { id: "ss3", name: "Server and Storage 3", logoSrc: server_storage_3, categories: ["Server and Storage"] },
      { id: "ss4", name: "Server and Storage 4", logoSrc: server_storage_4, categories: ["Server and Storage"] },

      // Surveillance
      { id: "surv0", name: "Surveillance", logoSrc: surveillance_0, categories: ["Surveillance"] },
      { id: "surv1", name: "Surveillance 1", logoSrc: surveillance_1, categories: ["Surveillance"] },
      { id: "surv2", name: "Surveillance 2", logoSrc: surveillance_2, categories: ["Surveillance"] },

      // Enterprise Security
      { id: "es0", name: "Enterprise Security", logoSrc: enterprise_security_0, categories: ["Enterprise Security"] },
      { id: "es1", name: "Enterprise Security 1", logoSrc: enterprise_security_1, categories: ["Enterprise Security"] },
      { id: "es2", name: "Enterprise Security 2", logoSrc: enterprise_security_2, categories: ["Enterprise Security"] },
      { id: "es3", name: "Enterprise Security 3", logoSrc: enterprise_security_3, categories: ["Enterprise Security"] },
      { id: "es4", name: "Enterprise Security 4", logoSrc: enterprise_security_4, categories: ["Enterprise Security"] },
      { id: "es5", name: "Enterprise Security 5", logoSrc: enterprise_security_5, categories: ["Enterprise Security"] },
      { id: "es6", name: "Enterprise Security 6", logoSrc: enterprise_security_6, categories: ["Enterprise Security"] },

      // Display Solution
      { id: "ds0", name: "Display Solution", logoSrc: display_solution_0, categories: ["Display Solution"] },
      { id: "ds1", name: "Display Solution 1", logoSrc: display_solution_1, categories: ["Display Solution"] },
      { id: "ds2", name: "Display Solution 2", logoSrc: display_solution_2, categories: ["Display Solution"] },
      { id: "ds3", name: "Display Solution 3", logoSrc: display_solution_3, categories: ["Display Solution"] },
      { id: "ds4", name: "Display Solution 4", logoSrc: display_solution_4, categories: ["Display Solution"] },
      { id: "ds5", name: "Display Solution 5", logoSrc: display_solution_5, categories: ["Display Solution"] },

      // Enterprise Software
      { id: "esw0", name: "Enterprise Software", logoSrc: enterprise_software_0, categories: ["Enterprise Software"] },
      { id: "esw1", name: "Enterprise Software 1", logoSrc: enterprise_software_1, categories: ["Enterprise Software"] },
      { id: "esw2", name: "Enterprise Software 2", logoSrc: enterprise_software_2, categories: ["Enterprise Software"] },
      { id: "esw3", name: "Enterprise Software 3", logoSrc: enterprise_software_3, categories: ["Enterprise Software"] },
      { id: "esw4", name: "Enterprise Software 4", logoSrc: enterprise_software_4, categories: ["Enterprise Software"] },
      { id: "esw5", name: "Enterprise Software 5", logoSrc: enterprise_software_5, categories: ["Enterprise Software"] }
    ],
    []
  );

  const [activeFilter, setActiveFilter] = useState('All');
  const [isFading, setIsFading] = useState(false);

  const filteredPartners = useMemo(() => {
    if (activeFilter === 'All') return partners;
    return partners.filter((p) => p.categories.includes(activeFilter));
  }, [partners, activeFilter]);

  const onChangeFilter = (f) => {
    if (f === activeFilter) return;

    // ✅ Fade out -> change -> fade in
    setIsFading(true);
    window.setTimeout(() => {
      setActiveFilter(f);
      setIsFading(false);

      // ❌ DO NOT scroll filters back to start (keeps user position)
      // if (filterScrollerRef.current) {
      //   filterScrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      // }
    }, 220);
  };

  const scrollFiltersRight = () => {
    if (!filterScrollerRef.current) return;
    filterScrollerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#EEF3F8] py-12">
      <div className="w-full xl:w-[90%] mx-auto px-2">
        {/* Heading */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="text-[#356DA4] text-[28px] sm:text-[34px] font-semibold">
            Explore The
          </h2>
          <p className="text-[#3A3A3A] text-[14px] sm:text-[16px] mt-3 leading-relaxed">
            Find a comprehensive range of technology solutions designed to support modern business operations. From advanced networking infrastructure to enterprise security and collaboration systems, our solutions are built to improve efficiency, connectivity, and reliability across your organization.
          </p>
        </div>

        {/* Filters - Desktop */}
        <div className="mt-8 hidden sm:flex flex-wrap justify-center gap-4">
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onChangeFilter(f)}
                className={`px-6 py-1 rounded-full border text-[16px] transition ${isActive
                  ? 'bg-[#B9C9DA] border-[#B9C9DA] text-[#1E2B3A]'
                  : 'bg-transparent border-[#B9D0E6] text-[#356DA4] hover:bg-white/60'
                  }`}
              >
                {f}
              </button>
            );
          })}
        </div>



        {/* Filters - Mobile Slider */}
        <div className="mt-6 sm:hidden relative">
          <div
            ref={filterScrollerRef}
            className="flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar pr-14"
          >
            {filters.map((f) => {
              const isActive = f === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => onChangeFilter(f)}
                  className={`shrink-0 px-5 py-2 rounded-full border text-[14px] transition whitespace-nowrap ${isActive
                    ? 'bg-[#B9C9DA] border-[#B9C9DA] text-[#1E2B3A]'
                    : 'bg-transparent border-[#B9D0E6] text-[#356DA4] hover:bg-white/60'
                    }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollFiltersRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-white shadow-md flex items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="text-[#356DA4] text-2xl">{'>'}</span>
          </button>
        </div>

        {/* Big Container (FIXED HEIGHT + SCROLLABLE) */}
        <div
          className="
            mt-10 border border-[#B9D0E6] rounded-[22px] bg-[#DEE9F2]
            p-6 sm:p-10
            h-[400px] sm:h-[450px] overflow-y-auto
            no-scrollbar
          "
        >
          {/* Desktop logos */}
          <div
            className={`
              hidden sm:flex w-full flex-wrap gap-8 justify-center items-center
              transition-opacity duration-300 ease-in-out
              ${isFading ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {filteredPartners.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm px-8 py-5 flex items-center justify-center min-w-[180px]"
              >
                <Image
                  src={p.logoSrc}
                  alt={p.name}
                  width={90}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}

            {filteredPartners.length === 0 && (
              <div className="w-full text-center py-10 text-[#356DA4] font-medium">
                No partners found for “{activeFilter}”.
              </div>
            )}
          </div>

          {/* Mobile logos: 2 per column + centered */}
          <div
            className={`
              sm:hidden w-full
              transition-opacity duration-300 ease-in-out
              ${isFading ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {filteredPartners.length === 0 ? (
              <div className="w-full text-center py-10 text-[#356DA4] font-medium">
                No partners found for “{activeFilter}”.
              </div>
            ) : (
              <div className="w-full overflow-x-auto no-scrollbar">
                {/* ✅ Centering trick: wrapper has px, inner uses inline-flex and mx-auto */}
                <div className="px-2">
                  <div className="inline-flex gap-4 scroll-smooth">
                    {Array.from({
                      length: Math.ceil(filteredPartners.length / 2),
                    }).map((_, colIdx) => {
                      const first = filteredPartners[colIdx * 2];
                      const second = filteredPartners[colIdx * 2 + 1];

                      return (
                        <div
                          key={colIdx}
                          className="shrink-0 w-[260px] flex flex-col gap-4"
                        >
                          {[first, second].filter(Boolean).map((p) => (
                            <div
                              key={p.id}
                              className="bg-white rounded-xl shadow-sm px-6 py-5 flex items-center justify-center w-full"
                            >
                              <Image
                                src={p.logoSrc}
                                alt={p.name}
                                width={90}
                                height={50}
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* ✅ if only 1 column, it will look centered because container is full width */}
                  {/* and the column width is fixed; user sees it centered with the padding */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partnerships;
