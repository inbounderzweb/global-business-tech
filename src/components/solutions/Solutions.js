// components/Solutions.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Replace these with your own local images if needed
import s1 from '../../assets/solutions/s1.jpg';
import s2 from '../../assets/solutions/s2.jpg';
import s3 from '../../assets/solutions/s3.jpg';
import s4 from '../../assets/solutions/s4.jpg';
import s5 from '../../assets/solutions/s5.jpg';

const SOLUTIONS = [
  {
    id: 1,
    title: 'Networking',
    desc: 'Scalable and secure networking infrastructure designed for high-performance enterprise connectivity.',
    image: s1,
    href: '/networking',
  },
  {
    id: 2,
    title: 'Virtualization',
    desc: 'Optimized server virtualization and cloud integration to maximize your business resource efficiency.',
    image: s2,
    href: '/virtualization',
  },
  {
    id: 3,
    title: 'Board Room',
    desc: 'State-of-the-art AV solutions for modern meeting rooms and collaborative corporate environments.',
    image: s3,
    href: '/board-room',
  },
  {
    id: 4,
    title: 'Cyber Security',
    desc: 'Advanced threat protection and data security strategies to safeguard your digital assets.',
    image: s4,
    href: '/cybersecurity',
  },
  {
    id: 5,
    title: 'Video Wall and Signage Solutions',
    desc: 'High-impact visual communication systems for retail, corporate lobbies, and command centers.',
    image: s5,
    href: '/video-wall-signage',
    wide: true,
  },
];

function SolutionCard({ item }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-full max-w-[360px] md:max-w-none">
        <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
          <div className="aspect-video" />
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 33vw"
            priority={item.id <= 2}
          />
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[#2F6FB3]">
        {item.title}
      </h3>

      <p className="mx-auto mt-2 max-w-[360px] text-sm leading-6 text-slate-600">
        {item.desc}
      </p>

      <Link
        href={item.href}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2F6FB3] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#245b95]"
      >
        Read more
      </Link>
    </div>
  );
}

function Solutions() {
  const topRow = SOLUTIONS.slice(0, 3);
  const bottomRow = SOLUTIONS.slice(3);

  return (
    <section className="w-full bg-[#EEF3F9] py-12 md:py-16">
      <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6">
        {/* Intro text */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm leading-6 text-slate-600">
            We provide specialized technology solutions tailored to your unique business challenges, ensuring seamless integration and long-term reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="space-y-12">
          {/* Row 1: 3 cards */}
          <div className="grid gap-10 md:grid-cols-3">
            {topRow.map((item) => (
              <SolutionCard key={item.id} item={item} />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="grid gap-10 md:grid-cols-2 md:px-[10%]">
            {bottomRow.map((item) => (
              <SolutionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
