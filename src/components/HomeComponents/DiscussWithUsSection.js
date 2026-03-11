// src/components/HomeComponents/DiscussWithUsSection.js
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// ✅ Import your exported images from Figma here:
import desktopimg from '../../assets/desktopbg.jpg';
import mobbg from '../../assets/mobbg.jpg';

export default function DiscussWithUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Business Inquiry: ${formData.business || "None"}`,
          message: `Phone: ${formData.phone} | Business: ${formData.business}`
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', business: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        {/* Desktop BG */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={desktopimg}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Mobile BG */}
        <div className="md:hidden absolute inset-0">
          <Image
            src={mobbg}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 20% 20%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%), linear-gradient(90deg, rgba(9,18,33,0.55), rgba(9,18,33,0.25) 55%, rgba(9,18,33,0.35))',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            <div className="min-h-[420px] flex items-stretch">
              {/* LEFT */}
              <div className="w-full md:w-[58%] py-10 md:py-14 pt-80">
                <h2 className="text-[#D6E3F3] font-semibold leading-[1.05] text-[34px] md:text-[44px]">
                  You have something
                  <br />
                  to discuss with us ??
                </h2>

                <p className="mt-4 text-[#B9C6D8] text-[14px] md:text-[15px] leading-relaxed max-w-[520px]">
                  Drop your Email address and Phone number, will we reach
                  <br className="hidden md:block" />
                  you with handful offers
                </p>

                {success ? (
                  <div className="mt-10 p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20 text-[#D6E3F3]">
                    <p className="font-bold text-lg">Thank you!</p>
                    <p className="text-sm opacity-80 mt-1">Our team will call you shortly to discuss your business requirements.</p>
                  </div>
                ) : (
                  <form className="mt-7 md:mt-9" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-[640px]">
                      <Field
                        label="Full Name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Field
                        label="Mail id"
                        placeholder="Mail id"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <Field
                        label="Phone Number"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      <Field
                        label="Business"
                        placeholder="Business Name"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      />
                    </div>

                    <div className="mt-8 md:mt-9 max-w-[640px] flex justify-center md:justify-start">
                      <button
                        type="submit"
                        disabled={loading}
                        className="
                          w-[220px] md:w-[260px]
                          h-[46px]
                          rounded-full
                          bg-[#2F6FAE]
                          text-white
                          text-[14px]
                          font-extrabold
                          hover:brightness-110
                          active:brightness-95
                          transition
                          disabled:opacity-50
                          flex items-center justify-center
                        "
                      >
                        {loading ? "Processing..." : "Submit Inquiry"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* RIGHT */}
              <div className="hidden md:block md:w-[42%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, required = false }) {
  return (
    <label className="block">
      <span className="block text-[#B9C6D8] text-[12px] mb-2 font-bold uppercase tracking-widest">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          h-[42px]
          rounded-[8px]
          px-4
          bg-[rgba(255,255,255,0.16)]
          text-[#DDE8F7]
          placeholder:text-[rgba(221,232,247,0.35)]
          border border-[rgba(255,255,255,0.10)]
          outline-none
          focus:border-[rgba(132,183,255,0.7)]
          focus:ring-2 focus:ring-[rgba(132,183,255,0.18)]
          transition
        "
        autoComplete="off"
      />
    </label>
  );
}
