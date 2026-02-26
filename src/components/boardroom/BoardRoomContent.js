// components/BoardRoomContent.jsx
import React from 'react';
import Image from 'next/image';

// ✅ Replace with your actual assets
import topLeftImg from '../../assets/boardroom/br1.jpg'; // top left photo
import midRightImg from '../../assets/boardroom/br2.jpg'; // mid right photo
import illusSolutions from '../../assets/boardroom/br3.png'; // middle illustration (left)
import illusBottom from '../../assets/boardroom/br4.png'; // bottom illustration (right)

const solutionsList = [
  'Analog Based Audio Conferencing',
  'IP Based Audio Conferencing',
  'Interactive Displays',
  'Wireless Presentation Systems',
  'Video Conferencing',
  'AV Control Systems',
];

const bottomList = [
  'Board Room Sizing and Capacity Planning and Design',
  'Board Room Management & Monitoring Tools',
  'Virtualization Skilled Manpower Outsourcing',
  'Board Room & Conference Room Annual technical Support',
  'Meeting Room Booking Systems',
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

function BoardRoomContent() {
  return (
    <section className="w-full bg-[#EEF3F9] overflow-x-hidden">
      {/* TOP SECTION */}
      <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Top left image */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <div className="aspect-[16/10]" />
              <Image
                src={topLeftImg}
                alt="Board room"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Top right text */}
          <div className="min-w-0">
            <p className="text-sm leading-6 text-slate-600">
              Corporate Boardrooms are no longer just an image building tool for
              large multi-national organisations. Over the last decade they have
              evolved into the hub for most strategic, operational and tactical
              decision making within organisations and are powered by a whole
              new generation of tools for presentations and smooth sharing of
              content.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              The modern boardroom &amp; conference room design features
              high-resolution displays of up to 4K for improved image clarity
              resulting in crisper more engaging presentations. This means that
              communicating finer details like intricate graphs, detailed
              spreadsheets and high-definition photographs etc., is simpler than
              ever before. These displays can also be touch sensitive, which
              allows information to be annotated to convey ideas in a more
              dynamic and precise way.
            </p>
          </div>
        </div>

        {/* Middle text left + image right */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-start">
          {/* Left text */}
          <div className="min-w-0 order-1">
            <p className="text-sm leading-6 text-slate-600">
              Wireless presentation technology enables BYOD, which allows
              presenters to walk in even with mobile devices like a tablet or a
              smartphone, and present content seamlessly and wirelessly. Highly
              intuitive control systems let the presenter get the room lighting,
              projector and other devices ready with the touch of a single
              button.
            </p>

            <p className="mt-6 text-sm leading-6 text-slate-600">
              Boardrooms &amp; Conference Rooms designed by Global Business Tech
              improves the environment for meetings, improves operational client
              interactions and helps reduce corporate travel expenses. It also
              provides meeting participants with the flexibility to participate
              remotely, in case they are unable to be physically present.
            </p>
          </div>

          {/* Right image */}
          <div className="min-w-0 order-2">
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <div className="aspect-[16/10]" />
              <Image
                src={midRightImg}
                alt="Conference room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE: Solutions */}
      <div className="w-full bg-[#C9D8E6]">
        <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Illustration left */}
            <div className="flex justify-center lg:justify-start min-w-0">
              <Image
                src={illusSolutions}
                alt="Board room solutions"
                className="h-auto w-full max-w-[560px]"
              />
            </div>

            {/* List right */}
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-[#2F6FB3]">
                Board Room and Conference <br className="hidden sm:block" />
                Room Solutions
              </h3>

              <BulletList items={solutionsList} />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Split White + Blue */}
      <div className="w-full">
        <div className="grid lg:grid-cols-2">
          {/* Left white */}
          <div className="bg-[#EEF3F9] py-10 md:py-14">
            <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 lg:pr-10">
              <p className="text-sm leading-6 text-slate-600 max-w-xl">
                The audio visual systems required for board rooms, are usually
                the most advanced multimedia solutions that any organization
                will invest in, since it is generally the boardroom that hosts
                the most crucial meetings with external people, or where
                critical internal decisions are made.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-600 max-w-xl">
                AV professionals say that boardroom design has taken on a
                holistic approach. Today, the enterprise-level boardroom is an
                integrated, interoperable collaboration space. Global Business
                Tech offers high quality AV integration, design, and
                installation and board room solutions to our clients with
                advance technology.
              </p>
            </div>
          </div>

          {/* Right blue */}
          <div className="bg-[#2E68A8] py-10 md:py-14">
            <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 lg:pl-10">
              <div className="grid gap-8 lg:grid-cols-[300px_1fr] items-center">
                <div className="flex justify-center lg:justify-start min-w-0">
                  <Image
                    src={illusBottom}
                    alt="Board room management"
                    className="h-auto w-full max-w-[300px]"
                  />
                </div>

                <div>
                  <BulletList items={bottomList} dark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoardRoomContent;
