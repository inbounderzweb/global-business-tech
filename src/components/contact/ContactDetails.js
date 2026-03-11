// src/components/contact/ContactDetails.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import contactmain from '../../assets/contact/contactmain.png';

export default function ContactDetails() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#D6E0EA] py-12 md:py-16">
      <div className="mx-auto w-[98%] max-w-6xl px-4 md:px-6">
        {/* Top info row */}
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Illustration */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[420px]">
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
            <h2 className="text-2xl font-bold text-[#2F6FB3]">
              We are just a ring away!
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We are ready to lead you into the future of Information
              Technology. Let’s have a rendezvous over coffee, on how we can
              help with creating effective solutions.
              <br />
              <br />
              Our expert team is available to assist you with any questions or
              technical requirements you may have. Reach out today and let's
              build the future together.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="mt-12 rounded-3xl bg-white/50 p-8 shadow-sm backdrop-blur-sm border border-white/50">
          <h3 className="text-center text-2xl font-bold text-[#2F6FB3]">
            Write to Us
          </h3>

          {success ? (
            <div className="mt-8 text-center p-10 bg-white rounded-2xl border border-blue-100 animate-in fade-in zoom-in-95">
              <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
              <p className="text-slate-500 mt-2">Specialists will get back to you shortly.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-blue-600 font-bold text-sm hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left column */}
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Full name*
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-700 outline-none transition-all focus:border-[#2F6FB3] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-700 outline-none transition-all focus:border-[#2F6FB3] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Email Address*
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-700 outline-none transition-all focus:border-[#2F6FB3] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Message*
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 outline-none transition-all focus:border-[#2F6FB3] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-center text-xs font-bold text-red-500">{error}</p>}

              {/* Button */}
              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 rounded-full bg-[#2F6FB3] px-12 py-4 text-base font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-[#245b95] active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Deliver Message</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
