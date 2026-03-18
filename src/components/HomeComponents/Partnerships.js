// ============================
// Partnerships.js
// ============================
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
// LOGO IMPORTS
import networking_cisco_logo_jpg from '../../assets/clientlogos/Networking/Cisco-logo.jpg';
import networking_cisco_meraki_logo__png from '../../assets/clientlogos/Networking/cisco-meraki-logo-.png';
import networking_hpe_aruba_jpg from '../../assets/clientlogos/Networking/HPE Aruba.jpg';
import networking_ruckus_networks_logo_png from '../../assets/clientlogos/Networking/ruckus networks logo.png';
import networkingpassive_amp_netconnect_logo_png from '../../assets/clientlogos/Networkingpassive/amp-netconnect-logo.png';
import networkingpassive_apc_logo_png from '../../assets/clientlogos/Networkingpassive/apc-logo.png';
import networkingpassive_commscope_logo_png from '../../assets/clientlogos/Networkingpassive/Commscope-Logo.png';
import networkingpassive_d_link_jpg from '../../assets/clientlogos/Networkingpassive/D LINK.jpg';
import networkingpassive_netrack_png from '../../assets/clientlogos/Networkingpassive/netrack.png';
import audiovideo_ahuja_logo_png from '../../assets/clientlogos/audiovideo/ahuja-logo.png';
import audiovideo_barco_logo_webp from '../../assets/clientlogos/audiovideo/barco_logo.webp';
import audiovideo_benq_logo_jpeg from '../../assets/clientlogos/audiovideo/Benq logo.jpeg';
import audiovideo_bose_logo_jpg from '../../assets/clientlogos/audiovideo/Bose-Logo.jpg';
import audiovideo_crestron_logo_jpg from '../../assets/clientlogos/audiovideo/Crestron-Logo.jpg';
import audiovideo_epson_logo_png from '../../assets/clientlogos/audiovideo/Epson_Logo.png';
import audiovideo_hp_poly_logo_jpg from '../../assets/clientlogos/audiovideo/hp_poly-logo.jpg';
import audiovideo_jabra_logo_webp from '../../assets/clientlogos/audiovideo/jabra_logo.webp';
import audiovideo_kramer_logo_jpg from '../../assets/clientlogos/audiovideo/kramer_logo.jpg';
import audiovideo_logic_log_jpg from '../../assets/clientlogos/audiovideo/Logic log.jpg';
import audiovideo_logitech_logo_2015_present_jpg from '../../assets/clientlogos/audiovideo/Logitech-Logo-2015-present.jpg';
import audiovideo_neat_jpg from '../../assets/clientlogos/audiovideo/neat.jpg';
import audiovideo_nureva_logo_webp from '../../assets/clientlogos/audiovideo/nureva-logo.webp';
import audiovideo_sennheiser_logo_jpg from '../../assets/clientlogos/audiovideo/Sennheiser-logo.jpg';
import audiovideo_shure_logo__jpg from '../../assets/clientlogos/audiovideo/Shure Logo .jpg';
import pccomputing_acer_logo_jpg from '../../assets/clientlogos/pccomputing/acer-logo.jpg';
import pccomputing_apple_logo_jpg from '../../assets/clientlogos/pccomputing/Apple logo.jpg';
import pccomputing_asusu_logo_jpg from '../../assets/clientlogos/pccomputing/Asusu Logo.jpg';
import pccomputing_dell_log_png from '../../assets/clientlogos/pccomputing/DELL log.png';
import pccomputing_hp_logo_png_seeklogo_265723_png from '../../assets/clientlogos/pccomputing/hp-logo-png_seeklogo-265723.png';
import pccomputing_lenovo_global_corporate_logo_png from '../../assets/clientlogos/pccomputing/Lenovo_Global_Corporate_Logo.png';
import serverandstorage_dell_log_png from '../../assets/clientlogos/serverandstorage/DELL log.png';
import serverandstorage_hp_logo_png_seeklogo_265723_png from '../../assets/clientlogos/serverandstorage/hp-logo-png_seeklogo-265723.png';
import serverandstorage_net_gear_logo_png from '../../assets/clientlogos/serverandstorage/Net gear logo.png';
import serverandstorage_qnap_logo_png from '../../assets/clientlogos/serverandstorage/Qnap logo.png';
import serverandstorage_synology_logo_jpg from '../../assets/clientlogos/serverandstorage/synology Logo.jpg';
import surveillance_axxis_logo_png from '../../assets/clientlogos/surveillance/Axxis logo.png';
import surveillance_hikvision_logo_jpg from '../../assets/clientlogos/surveillance/Hikvision logo.jpg';
import surveillance_honeywell_logo_jpg from '../../assets/clientlogos/surveillance/Honeywell-logo.jpg';
import enterprise_security_check_point_logo_jpeg from '../../assets/clientlogos/enterprise Security/check_point_logo.jpeg';
import enterprise_security_cisco_logo_jpg from '../../assets/clientlogos/enterprise Security/Cisco-logo.jpg';
import enterprise_security_crowdstrike_logo_jpg from '../../assets/clientlogos/enterprise Security/Crowdstrike-logo.jpg';
import enterprise_security_fortinet_logo_png from '../../assets/clientlogos/enterprise Security/Fortinet Logo.png';
import enterprise_security_netskope_logo_jpeg from '../../assets/clientlogos/enterprise Security/netskope logo.jpeg';
import enterprise_security_palo_alto_logo_jpg from '../../assets/clientlogos/enterprise Security/Palo-Alto-Logo.jpg';
import enterprise_security_sophos_logo_jpg from '../../assets/clientlogos/enterprise Security/Sophos-Logo.jpg';
import displaysolution_absen_logo_png from '../../assets/clientlogos/displaysolution/Absen logo.png';
import displaysolution_aet_logo_jpeg from '../../assets/clientlogos/displaysolution/aet_logo.jpeg';
import displaysolution_lg_logos_png from '../../assets/clientlogos/displaysolution/LG Logos.png';
import displaysolution_logic_log_jpg from '../../assets/clientlogos/displaysolution/Logic log.jpg';
import displaysolution_panasonic_logo__webp from '../../assets/clientlogos/displaysolution/panasonic-logo-.webp';
import displaysolution_samsung_logo_avif from '../../assets/clientlogos/displaysolution/Samsung Logo.avif';
import enterprise_software_adobe_logo_webp from '../../assets/clientlogos/enterprise software/adobe-logo.webp';
import enterprise_software_amp_netconnect_logo_png from '../../assets/clientlogos/enterprise software/amp-netconnect-logo.png';
import enterprise_software_autodesk_autocad_logo_jpg from '../../assets/clientlogos/enterprise software/Autodesk-AutoCAD-logo.jpg';
import enterprise_software_microsoft_logo_jpg from '../../assets/clientlogos/enterprise software/Microsoft_Logo.jpg';
import enterprise_software_siemens_logo_jpg from '../../assets/clientlogos/enterprise software/Siemens Logo.jpg';
import enterprise_software_zoho_logo_png from '../../assets/clientlogos/enterprise software/zoho-logo.png';

function Partnerships() {
  const filterScrollerRef = useRef(null);

  const filters = useMemo(
    () => [
      'All',
      'Networking',
      'Networkingpassive',
      'audiovideo',
      'pccomputing',
      'serverandstorage',
      'surveillance',
      'enterprise Security',
      'displaysolution',
      'enterprise software'
    ],
    []
  );

  const partners = useMemo(
    () => [
      {
        "id": "networking-cisco-logo.jpg",
        "name": "Cisco Logo",
        "logoSrc": networking_cisco_logo_jpg,
        "categories": [
          "Networking"
        ]
      },
      {
        "id": "networking-cisco-meraki-logo-.png",
        "name": "Cisco Meraki Logo ",
        "logoSrc": networking_cisco_meraki_logo__png,
        "categories": [
          "Networking"
        ]
      },
      {
        "id": "networking-hpe aruba.jpg",
        "name": "Hpe Aruba",
        "logoSrc": networking_hpe_aruba_jpg,
        "categories": [
          "Networking"
        ]
      },
      {
        "id": "networking-ruckus networks logo.png",
        "name": "Ruckus Networks Logo",
        "logoSrc": networking_ruckus_networks_logo_png,
        "categories": [
          "Networking"
        ]
      },
      {
        "id": "networkingpassive-amp-netconnect-logo.png",
        "name": "Amp Netconnect Logo",
        "logoSrc": networkingpassive_amp_netconnect_logo_png,
        "categories": [
          "Networkingpassive"
        ]
      },
      {
        "id": "networkingpassive-apc-logo.png",
        "name": "Apc Logo",
        "logoSrc": networkingpassive_apc_logo_png,
        "categories": [
          "Networkingpassive"
        ]
      },
      {
        "id": "networkingpassive-commscope-logo.png",
        "name": "Commscope Logo",
        "logoSrc": networkingpassive_commscope_logo_png,
        "categories": [
          "Networkingpassive"
        ]
      },
      {
        "id": "networkingpassive-d link.jpg",
        "name": "D Link",
        "logoSrc": networkingpassive_d_link_jpg,
        "categories": [
          "Networkingpassive"
        ]
      },
      {
        "id": "networkingpassive-netrack.png",
        "name": "Netrack",
        "logoSrc": networkingpassive_netrack_png,
        "categories": [
          "Networkingpassive"
        ]
      },
      {
        "id": "audiovideo-ahuja-logo.png",
        "name": "Ahuja Logo",
        "logoSrc": audiovideo_ahuja_logo_png,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-barco_logo.webp",
        "name": "Barco Logo",
        "logoSrc": audiovideo_barco_logo_webp,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-benq logo.jpeg",
        "name": "Benq Logo",
        "logoSrc": audiovideo_benq_logo_jpeg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-bose-logo.jpg",
        "name": "Bose Logo",
        "logoSrc": audiovideo_bose_logo_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-crestron-logo.jpg",
        "name": "Crestron Logo",
        "logoSrc": audiovideo_crestron_logo_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-epson_logo.png",
        "name": "Epson Logo",
        "logoSrc": audiovideo_epson_logo_png,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-hp_poly-logo.jpg",
        "name": "Hp Poly Logo",
        "logoSrc": audiovideo_hp_poly_logo_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-jabra_logo.webp",
        "name": "Jabra Logo",
        "logoSrc": audiovideo_jabra_logo_webp,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-kramer_logo.jpg",
        "name": "Kramer Logo",
        "logoSrc": audiovideo_kramer_logo_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-logic log.jpg",
        "name": "Logic Log",
        "logoSrc": audiovideo_logic_log_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-logitech-logo-2015-present.jpg",
        "name": "Logitech Logo 2015 Present",
        "logoSrc": audiovideo_logitech_logo_2015_present_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-neat.jpg",
        "name": "Neat",
        "logoSrc": audiovideo_neat_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-nureva-logo.webp",
        "name": "Nureva Logo",
        "logoSrc": audiovideo_nureva_logo_webp,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-sennheiser-logo.jpg",
        "name": "Sennheiser Logo",
        "logoSrc": audiovideo_sennheiser_logo_jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "audiovideo-shure logo .jpg",
        "name": "Shure Logo ",
        "logoSrc": audiovideo_shure_logo__jpg,
        "categories": [
          "audiovideo"
        ]
      },
      {
        "id": "pccomputing-acer-logo.jpg",
        "name": "Acer Logo",
        "logoSrc": pccomputing_acer_logo_jpg,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "pccomputing-apple logo.jpg",
        "name": "Apple Logo",
        "logoSrc": pccomputing_apple_logo_jpg,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "pccomputing-asusu logo.jpg",
        "name": "Asusu Logo",
        "logoSrc": pccomputing_asusu_logo_jpg,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "pccomputing-dell log.png",
        "name": "Dell Log",
        "logoSrc": pccomputing_dell_log_png,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "pccomputing-hp-logo-png_seeklogo-265723.png",
        "name": "Hp Logo Png Seeklogo 265723",
        "logoSrc": pccomputing_hp_logo_png_seeklogo_265723_png,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "pccomputing-lenovo_global_corporate_logo.png",
        "name": "Lenovo Global Corporate Logo",
        "logoSrc": pccomputing_lenovo_global_corporate_logo_png,
        "categories": [
          "pccomputing"
        ]
      },
      {
        "id": "serverandstorage-dell log.png",
        "name": "Dell Log",
        "logoSrc": serverandstorage_dell_log_png,
        "categories": [
          "serverandstorage"
        ]
      },
      {
        "id": "serverandstorage-hp-logo-png_seeklogo-265723.png",
        "name": "Hp Logo Png Seeklogo 265723",
        "logoSrc": serverandstorage_hp_logo_png_seeklogo_265723_png,
        "categories": [
          "serverandstorage"
        ]
      },
      {
        "id": "serverandstorage-net gear logo.png",
        "name": "Net Gear Logo",
        "logoSrc": serverandstorage_net_gear_logo_png,
        "categories": [
          "serverandstorage"
        ]
      },
      {
        "id": "serverandstorage-qnap logo.png",
        "name": "Qnap Logo",
        "logoSrc": serverandstorage_qnap_logo_png,
        "categories": [
          "serverandstorage"
        ]
      },
      {
        "id": "serverandstorage-synology logo.jpg",
        "name": "Synology Logo",
        "logoSrc": serverandstorage_synology_logo_jpg,
        "categories": [
          "serverandstorage"
        ]
      },
      {
        "id": "surveillance-axxis logo.png",
        "name": "Axxis Logo",
        "logoSrc": surveillance_axxis_logo_png,
        "categories": [
          "surveillance"
        ]
      },
      {
        "id": "surveillance-hikvision logo.jpg",
        "name": "Hikvision Logo",
        "logoSrc": surveillance_hikvision_logo_jpg,
        "categories": [
          "surveillance"
        ]
      },
      {
        "id": "surveillance-honeywell-logo.jpg",
        "name": "Honeywell Logo",
        "logoSrc": surveillance_honeywell_logo_jpg,
        "categories": [
          "surveillance"
        ]
      },
      {
        "id": "enterprise security-check_point_logo.jpeg",
        "name": "Check Point Logo",
        "logoSrc": enterprise_security_check_point_logo_jpeg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-cisco-logo.jpg",
        "name": "Cisco Logo",
        "logoSrc": enterprise_security_cisco_logo_jpg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-crowdstrike-logo.jpg",
        "name": "Crowdstrike Logo",
        "logoSrc": enterprise_security_crowdstrike_logo_jpg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-fortinet logo.png",
        "name": "Fortinet Logo",
        "logoSrc": enterprise_security_fortinet_logo_png,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-netskope logo.jpeg",
        "name": "Netskope Logo",
        "logoSrc": enterprise_security_netskope_logo_jpeg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-palo-alto-logo.jpg",
        "name": "Palo Alto Logo",
        "logoSrc": enterprise_security_palo_alto_logo_jpg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "enterprise security-sophos-logo.jpg",
        "name": "Sophos Logo",
        "logoSrc": enterprise_security_sophos_logo_jpg,
        "categories": [
          "enterprise Security"
        ]
      },
      {
        "id": "displaysolution-absen logo.png",
        "name": "Absen Logo",
        "logoSrc": displaysolution_absen_logo_png,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "displaysolution-aet_logo.jpeg",
        "name": "Aet Logo",
        "logoSrc": displaysolution_aet_logo_jpeg,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "displaysolution-lg logos.png",
        "name": "Lg Logos",
        "logoSrc": displaysolution_lg_logos_png,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "displaysolution-logic log.jpg",
        "name": "Logic Log",
        "logoSrc": displaysolution_logic_log_jpg,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "displaysolution-panasonic-logo-.webp",
        "name": "Panasonic Logo ",
        "logoSrc": displaysolution_panasonic_logo__webp,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "displaysolution-samsung logo.avif",
        "name": "Samsung Logo",
        "logoSrc": displaysolution_samsung_logo_avif,
        "categories": [
          "displaysolution"
        ]
      },
      {
        "id": "enterprise software-adobe-logo.webp",
        "name": "Adobe Logo",
        "logoSrc": enterprise_software_adobe_logo_webp,
        "categories": [
          "enterprise software"
        ]
      },
      {
        "id": "enterprise software-amp-netconnect-logo.png",
        "name": "Amp Netconnect Logo",
        "logoSrc": enterprise_software_amp_netconnect_logo_png,
        "categories": [
          "enterprise software"
        ]
      },
      {
        "id": "enterprise software-autodesk-autocad-logo.jpg",
        "name": "Autodesk Autocad Logo",
        "logoSrc": enterprise_software_autodesk_autocad_logo_jpg,
        "categories": [
          "enterprise software"
        ]
      },
      {
        "id": "enterprise software-microsoft_logo.jpg",
        "name": "Microsoft Logo",
        "logoSrc": enterprise_software_microsoft_logo_jpg,
        "categories": [
          "enterprise software"
        ]
      },
      {
        "id": "enterprise software-siemens logo.jpg",
        "name": "Siemens Logo",
        "logoSrc": enterprise_software_siemens_logo_jpg,
        "categories": [
          "enterprise software"
        ]
      },
      {
        "id": "enterprise software-zoho-logo.png",
        "name": "Zoho Logo",
        "logoSrc": enterprise_software_zoho_logo_png,
        "categories": [
          "enterprise software"
        ]
      }
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
