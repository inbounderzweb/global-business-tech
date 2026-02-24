// components/VirtualizationContent.jsx
import React from "react";
import Image from "next/image";

// ✅ Replace these with your real assets
import topImg from "../../assets/virtualization/v1.jpg"; // big top-left image (cloud laptop)
import smallImg from "../../assets/virtualization/v2.jpg"; // small right image (icons)
import illusSol from "../../assets/virtualization/virt-solutions.png"; // middle-left illustration
import illusBottom from "../../assets/virtualization/virt-bottom.png"; // bottom-right illustration

const solutionsLeft = [
    "Server Virtualization",
    "Network Virtualization",
    "Desktop Virtualization",
    "Storage Virtualization",
    "Operating system virtualization",
    "Network functions virtualization",
];

const solutionsRight = [
    "Disaster Recovery and Business Continuity",
    "Software Life cycle Automation",
    "Data Centre & Application Workloads Migration and Optimization Solutions",
    "Cloud Computing",
];

const servicesRight = [
    "Virtual Infrastructure Capacity Planning and Design",
    "Virtual Infrastructure Management & Monitoring",
    "Virtualization Skilled Manpower Outsourcing",
    "Virtualization Annual technical Support",
    "Virtual Infrastructure Audit",
];

function BulletList({ items, dark = false }) {
    return (
        <ul className="mt-3 space-y-2 text-sm leading-6">
            {items.map((t, i) => (
                <li key={i} className="flex gap-2">
                    <span
                        className={
                            dark
                                ? "mt-2 h-2 w-2 rounded-full bg-white/85"
                                : "mt-2 h-2 w-2 rounded-full bg-[#2F6FB3]"
                        }
                    />
                    <span className={dark ? "text-white/85" : "text-slate-600"}>{t}</span>
                </li>
            ))}
        </ul>
    );
}

function VirtualizationContent() {
    return (
        <section className="w-full bg-[#EEF3F9]">
            {/* TOP CONTENT */}
            <div className="mx-auto w-[98%] lg:w-[90%] px-4 md:px-6 py-10 md:py-14">
                <div className="grid gap-8 lg:grid-cols-2 items-start">
                    {/* Left big image */}
                    <div className="min-w-0">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
                            <div className="aspect-[16/10]" />
                            <Image
                                src={topImg}
                                alt="Virtualization"
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
                            Global Business Tech has strategically made substantial investment
                            in building up a large end to end portfolio of Virtualization
                            across the entire IT infrastructure space. By working closely with
                            the several world’s leading technology vendors we help our client
                            to build Virtualized environments to seamlessly and securely
                            harness the enormous benefits of the new technology trends.
                        </p>

                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Virtualization is one of the most powerful resources available
                            within the world of IT infrastructure. A well-executed server
                            virtualization strategy can more efficiently utilize available
                            hardware resources, providing business owners with additional
                            flexibility and agency in their own operations.
                        </p>

                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            With virtualization, businesses can enjoy significantly faster
                            server provisioning. Also, virtualization allows for rapid cloning
                            and deployment of new virtual servers, helping to ensure that
                            scalability and systems integrity are never compromised. Perhaps
                            most importantly, virtualization helps ramp up reliability and
                            all but eliminate the possibility of unplanned server outages.
                        </p>
                    </div>
                </div>

                {/* Bottom paragraph + small image */}
                <div className="mt-8 grid gap-8 lg:grid-cols-2 items-start">
                    <p className="text-sm leading-6 text-slate-600">
                        There are many reasons why people utilize virtualization in
                        computing. To desktop users, the most common use is to be able to
                        run applications meant for a different operating system without
                        having to switch computers or reboot into a different system. For
                        administrators of servers, virtualization also offers the ability to
                        run different operating systems, but perhaps, more importantly, it
                        offers a way to segment a server system into many smaller parts,
                        allowing the server to be used more efficiently by a number of
                        different users or applications with different needs. It also allows
                        for isolation, keeping programs running inside of a virtual machine
                        safe from the processes taking place in another virtual machine on
                        the same host.
                    </p>

                    <div className="min-w-0">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
                            <div className="aspect-[16/10]" />
                            <Image
                                src={smallImg}
                                alt="Virtualization concepts"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MIDDLE: VIRTUALIZATION SOLUTIONS */}
            <div className="w-full bg-[#C9D8E6]">
                <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6 py-10 md:py-14">
                    <div className="grid gap-10 lg:grid-cols-2 items-center">
                        {/* Illustration */}
                        <div className="flex justify-center lg:justify-start">
                            <Image
                                src={illusSol}
                                alt="Virtualization solutions"
                                className="h-auto w-full max-w-[540px]"
                            />
                        </div>

                        {/* List */}
                        <div className="min-w-0">
                            <h3 className="text-xl font-semibold text-[#2F6FB3]">
                                Virtualization Solutions
                            </h3>

                            <div className="mt-3 grid gap-6 sm:grid-cols-2">
                                <BulletList items={solutionsLeft} />
                                <BulletList items={solutionsRight} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM: SERVICES + BLUE PANEL */}
            <div className="w-full">
                <div className="mx-auto w-[98%] lg:w-[90%] max-w-6xl px-4 md:px-6">
                    <div className="grid lg:grid-cols-2">
                        {/* Left white section */}
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

                        {/* Right blue section */}
                        <div className="bg-[#2E68A8] py-10 md:py-14 px-6 md:px-10">
                            <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-center">
                                <div className="flex justify-center lg:justify-start">
                                    <Image
                                        src={illusBottom}
                                        alt="Virtualization services"
                                        className="h-auto w-full max-w-[280px]"
                                    />
                                </div>

                                <div>
                                    <BulletList items={servicesRight} dark />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VirtualizationContent;