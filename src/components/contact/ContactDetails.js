// app/contact/page.jsx  (or pages/contact.jsx)
import React from 'react';
import Image from 'next/image';
import contactmain from '../../assets/contact/contactmain.png';

export default function ContactDetails() {
  return (
    <section className="w-full bg-[#D6E0EA] py-12 md:py-16">
      <div className="mx-auto w-[98%] max-w-6xl px-4 md:px-6">
        {/* Top info row */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Illustration */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[420px]">
              {/* Replace with your own illustration path if you have */}
              <Image
                src={contactmain}
                alt="Contact illustration"
                width={900}
                height={650}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:pr-6">
            <h2 className="text-xl font-semibold text-[#2F6FB3]">
              We are just a ring away!
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We are ready to lead you into the future of Information
              Technology. Let’s have a rendezvous over coffee, on how we can
              help with creating effective solutions.
              <br />
              <br />
              We are ready to lead you into the future of Information
              Technology. Let’s have a rendezvous over coffee, on how we can
              help with creating effective solutions. We are ready to lead you
              into the future of Information Technology.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="mt-12 rounded-2xl bg-transparent">
          <h3 className="text-center text-lg font-semibold text-[#2F6FB3]">
            Write to Us
          </h3>

          <form className="mx-auto mt-6 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Full name*
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#2F6FB3]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#2F6FB3]"
                  />
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3">
                  <div className="h-4 w-4 rounded border border-slate-300" />
                  <p className="text-xs text-slate-600">I’m not a robot</p>
                  <div className="ml-auto text-[10px] text-slate-400">
                    reCAPTCHA
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Mail id*
                  </label>
                  <input
                    type="email"
                    placeholder="Mail id"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#2F6FB3]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Message/ Comment
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Message/ Comment"
                    className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#2F6FB3]"
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                className="rounded-full bg-[#2F6FB3] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#245b95]"
              >
                Send your message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
