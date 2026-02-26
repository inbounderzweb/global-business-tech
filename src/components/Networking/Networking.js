// components/Networking.jsx
import React from 'react';
import Image from 'next/image';

// Replace these with your real assets
import heroImg from '../../assets/networking/n1.jpg'; // top right (red cables)
import midImg from '../../assets/networking/n2.jpg'; // middle left (b/w office)
import illusNet from '../../assets/networking/net-illustration.png'; // networking solutions illustration
import illusVirt from '../../assets/networking/virt-illustration.png'; // virtualization illustration

const networkingPoints = [
  'Planning & Design of Storage Strategy & Policy',
  'Structure Cabling',
  'Support maintenance contracts',
  'Data Migration',
  'Optical Cabling',
  'Annual Maintenance Contracts for Networks',
];

const virtualizationPoints = [
  'Virtual Infrastructure Capacity Planning and Design',
  'Virtual Infrastructure Management & Monitoring',
  'Virtualization Skilled Manpower Outsourcing',
  'Virtualization Annual technical Support',
  'Virtual Infrastructure Audit',
];

function BulletList({ items, dark = false }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-6">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span
            className={
              dark
                ? 'mt-2 h-2 w-2 rounded-full bg-white/80'
                : 'mt-2 h-2 w-2 rounded-full bg-[#2F6FB3]'
            }
          />
          <span className={dark ? 'text-white/85' : 'text-slate-600'}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Networking() {
  return (
    <section className="w-full bg-[#EEF3F9]">
      {/* Top content */}
      <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Left text */}
          <div className="min-w-0">
            <p className="text-sm leading-6 text-slate-600">
              The infrastructure which can take care of the data flow of the
              application like, video, voice, virtualized applications, cloud
              computing and do the application delivery with the desired QoS and
              security. More than traditional Speed and Availability philosophy
              we believe in building more robust, scalable and secure Network
              Infrastructure.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              The nodes of a computer network may be classified by many means as
              personal computers, servers, networking hardware, or general
              purpose hosts. They are identified by hostnames and network
              addresses. Hostnames serve as memorable labels for the nodes,
              rarely changed after initial assignment. Network addresses serve
              for locating and identifying the nodes by communication protocols
              such as the Internet Protocol.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Global Business Tech have a team of certified engineers to take
              care of complete life cycle from Survey, Assessment, Design,
              Supply, Install, Manage, Cabling and Innovation end to end Network
              infrastructure. And have strong partnerships with world’s
              technology leaders for entire suit of Networking Infrastructure
              products and services.
            </p>
          </div>

          {/* Right image */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <div className="aspect-[16/10]" />
              <Image
                src={midImg}
                alt="Workplace"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>

        {/* Middle image + text */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-start">
          {/* Left image */}
          <div className="min-w-0 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <div className="aspect-[16/10]" />

              <Image
                src={heroImg}
                alt="Networking cables"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Right text */}
          <div className="min-w-0 order-1 lg:order-2">
            <p className="text-sm leading-6 text-slate-600">
              Computer networks may be classified by many criteria, for example,
              the transmission medium used to carry signals, bandwidth,
              communications protocols to organize network traffic, the network
              size, the topology, traffic control mechanism, and organizational
              intent.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Global Business Tech experience and expertise across the entire IT
              Infrastructure products and services like application, servers,
              storage and networks help our customers to build the network which
              will maximize their investment without duplicating the efforts in
              virtualized network. Global Business Tech has built a very strong
              skilled and expert technical team who carries multiple
              certifications across all the virtualized domains. Global Business
              Tech is committed to engage with our customer to Assess, Design,
              Deliver, and manage and innovate their virtualized environment
              which will meet their objective set for any Virtualization
              Project.
            </p>
          </div>
        </div>
      </div>

      {/* Networking Solutions block */}
      <div className="w-full bg-[#C9D8E6]">
        <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6 py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Illustration */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src={illusNet}
                alt="Networking solutions"
                className="h-auto w-full max-w-[520px]"
                priority={false}
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-semibold text-[#2F6FB3]">
                Networking Solutions
              </h3>
              <BulletList items={networkingPoints} />
            </div>
          </div>
        </div>
      </div>

      {/* Virtualization section */}
      <div className="w-full">
        <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2">
            {/* Left white content */}
            <div className="bg-[#EEF3F9] py-10 md:py-14 pr-0 lg:pr-10">
              <h3 className="text-xl font-semibold text-[#2F6FB3]">
                Virtualization Services:
                <br />
                Consulting, Assessment,
                <br />
                and Implementation
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-600 max-w-xl">
                Our professional IT management team will work closely with you
                to find the best possible strategies and solutions to guarantee
                that your IT infrastructure functions at the highest possible
                levels. Ultimately, our managed service team is committed to
                empowering each of our clients and helping them expand and
                augment their own efficiency and performance.
              </p>
            </div>

            {/* Right blue content */}
            <div className="bg-[#2E68A8] py-10 md:py-14 px-6 md:px-10">
              <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-center">
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src={illusVirt}
                    alt="Virtualization"
                    className="h-auto w-full max-w-[260px]"
                  />
                </div>

                <div>
                  <BulletList items={virtualizationPoints} dark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Networking;
