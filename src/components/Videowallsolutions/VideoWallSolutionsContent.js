// components/VideoWallSolutionsContent.jsx
import React from 'react';
import Image from 'next/image';

import heroImg from '../../assets/videowall/v1.jpg';
import illusApps from '../../assets/videowall/v2.png';
import illusDesigns from '../../assets/videowall/v3.png';

const applicationsLeft = [
  'CCTV control rooms',
  'Transport centres',
  'Broadcast studios',
  'Reception areas',
  'Exhibition stands',
];

const applicationsRight = [
  'Air Traffic Digital Remote Towers',
  'Training simulators',
  'Monitoring stations',
  'Meeting rooms and offices',
];

const designsLeft = [
  'Standard configurations',
  'Customised designs',
  'Large spans',
  'Curved configurations',
  'Corner configurations',
  'Desktop mounted options',
  'Powder coated framework',
];

const designsRight = [
  'Vertically mounted screen displays',
  'Ceiling mounted',
  'Media walls with storage',
  'Media walls with infill panels',
  'Mobile media walls',
  'Enclosed monitor walls',
];

function BulletList({ items, dark = false }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-6">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span
            className={
              dark
                ? 'mt-2 h-2 w-2 rounded-full bg-white/85'
                : 'mt-2 h-2 w-2 rounded-full bg-[#2F6FB3]'
            }
          />
          <span className={dark ? 'text-white/85' : 'text-slate-600'}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function VideoWallSolutionsContent() {
  return (
    <section className="w-full bg-[#EEF3F9] overflow-x-hidden">
      {/* TOP: image + text (kept as you have, container is OK) */}
      <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Left image */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <div className="aspect-[16/10]" />
              <Image
                src={heroImg}
                alt="Video wall solutions"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Right text */}
          <div className="min-w-0">
            <p className="text-sm leading-6 text-slate-600">
              Global Business Tech complete portfolio of industry-leading video
              wall solutions encompasses a wide range of different technologies,
              sizes, and resolutions. Our LED and LCD solutions feature
              seamless, ultra-fine pitch direct view LED video walls or the
              narrowest LCD bezels with the slimmest installation depths. Our
              LED-illuminated rear -projection video wall displays deliver the
              superb image quality and industry-leading power-efficient
              performance. All of our video walls deliver superior visual
              performance with 24×7 reliability.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Global Business Tech innovative LED, LCD, and LED-illuminated
              rear-projection video wall solutions are specifically designed to
              deliver precise and brilliant visual messages in the world’s most
              demanding environments—from control rooms to digital signage and
              architectural applications.
            </p>
          </div>
        </div>
      </div>

      {/* MIDDLE: Applications (full width background, content centered) */}
      <div className="w-full bg-[#C9D8E6]">
        <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="flex justify-center lg:justify-start min-w-0">
              <Image
                src={illusApps}
                alt="Video wall applications"
                className="h-auto w-full max-w-[560px]"
              />
            </div>

            {/* Lists */}
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-[#2F6FB3]">
                Video Wall Applications
              </h3>

              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <BulletList items={applicationsLeft} />
                <BulletList items={applicationsRight} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Designs (THIS is what was breaking) */}
      {/* Full width split. Only the inner content is constrained. */}
      <div className="w-full">
        <div className="grid lg:grid-cols-2">
          {/* Left white */}
          <div className="bg-[#EEF3F9] py-10 md:py-14">
            <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 lg:pr-10">
              <h3 className="text-xl font-semibold text-[#2F6FB3]">
                Video Wall Designs
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-600 max-w-xl">
                Global Business Tech innovative LED, LCD, and LED-illuminated
                rear-projection video wall solutions are specifically designed
                to deliver precise and brilliant visual messages in the world’s
                most demanding environments—from control rooms to digital
                signage and architectural applications.
              </p>
            </div>
          </div>

          {/* Right blue */}
          <div className="bg-[#2E68A8] py-10 md:py-14">
            <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 lg:pl-10">
              <div className="grid gap-8 lg:grid-cols-[300px_1fr] items-center">
                <div className="flex justify-center lg:justify-start min-w-0">
                  <Image
                    src={illusDesigns}
                    alt="Video wall designs"
                    className="h-auto w-full max-w-[300px]"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <BulletList items={designsLeft} dark />
                  <BulletList items={designsRight} dark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoWallSolutionsContent;
