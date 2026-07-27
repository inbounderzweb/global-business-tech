// src/components/products/RequestQuoteModal.js
'use client';

import { useState } from 'react';

export default function RequestQuoteModal({ open, onClose, context }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  if (!open) return null;

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: `Quote Request — ${context || 'Products'}`,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 text-2xl leading-none"
        >
          ×
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <h3 className="text-xl font-bold text-[#2C5C8F]">Thanks — request received</h3>
            <p className="mt-2 text-sm text-slate-500">Our team will reach out with a quote shortly.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center bg-[#356DA4] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2d5c8b] transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-[#2C5C8F]">Request a Quote</h3>
            {context && <p className="text-sm text-slate-500">For: {context}</p>}

            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange('name')}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange('email')}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange('phone')}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white"
            />
            <textarea
              placeholder="Tell us about your requirement..."
              required
              value={form.message}
              onChange={handleChange('message')}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white resize-none"
            />

            {status === 'error' && (
              <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center bg-[#356DA4] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#2d5c8b] transition disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
