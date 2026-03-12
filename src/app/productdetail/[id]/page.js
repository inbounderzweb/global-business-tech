// src/app/productdetail/[id]/page.js
"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Banner from '@/components/productdetail/Banner';

export default function DynamicProductDetail({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    // Form for enquiry
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`/api/admin/products/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setActiveImage(data.mainImage);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    const handleEnquiry = async (e) => {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/admin/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    productId: product.id
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '', address: '', message: '' });
                setTimeout(() => {
                    setShowModal(false);
                    setSuccess(false);
                }, 3000);
            } else if (res.status === 400 && data.missing) {
                setError(`Please fill missing fields: ${data.missing.join(", ")}`);
            } else {
                setError(data.details || data.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Network error. Please check your connection.");
        } finally {
            setSending(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#356DA4] border-t-transparent"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20 font-bold text-slate-500 underline underline-offset-8">Product not found</div>;

    const gallery = JSON.parse(product.gallery || "[]");
    const allImages = [product.mainImage, ...gallery].filter(Boolean);

    return (
        <div className="bg-[#EEF3F8] min-h-screen">
            <Banner />

            <div className="py-12 md:py-20">
                <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* GALLERY */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm">
                                <div className="relative aspect-square w-full">
                                    <Image
                                        src={activeImage || product.mainImage}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative shrink-0 h-24 w-32 rounded-2xl overflow-hidden bg-white border-2 transition-all
                                            ${activeImage === img ? 'border-[#356DA4] scale-105 shadow-md' : 'border-transparent opacity-70'}
                                        `}
                                    >
                                        <Image src={img} alt="" fill className="object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="bg-white rounded-[40px] p-10 shadow-sm space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-[#2E6EA5] leading-tight mb-4">{product.name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="bg-blue-50 text-[#356DA4] text-[10px] uppercase font-black px-4 py-1.5 rounded-full ring-1 ring-blue-100">
                                        {product.category?.name}
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full"></div>

                            <div className="space-y-6">
                                <p className="text-slate-600 leading-relaxed text-lg italic ">{product.description}</p>
                                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                                    ₹{product.price.toLocaleString()}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full bg-[#356DA4] text-white py-6 rounded-[24px] text-xl font-black shadow-xl shadow-blue-200 transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                                    Enquire Now
                                </button>
                                <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    Secure Business Inquiry
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0B1F3A]/80 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[48px] p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {success ? (
                            <div className="text-center py-12">
                                <div className="h-24 w-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Inquiry Sent!</h2>
                                <p className="text-slate-500 font-bold">Our representative will contact you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-[#2E6EA5]">Enquire for {product.name}</h2>
                                    <p className="text-slate-500 font-bold mt-1">Fill the details and we will reach back with the best quote.</p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-pulse">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" /></svg>
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleEnquiry} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase font-black text-slate-400 ml-4">Full Name*</label>
                                            <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your Name" className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase font-black text-slate-400 ml-4">Email ID*</label>
                                            <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-blue-500/20" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-black text-slate-400 ml-4">Phone Number*</label>
                                        <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="tel" placeholder="+91 XXX XXX XXXX" className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-blue-500/20" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-black text-slate-400 ml-4">Office/Home Address*</label>
                                        <textarea required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} rows={2} placeholder="Enter your full address" className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-blue-500/20 resize-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-black text-slate-400 ml-4">Message (Optional)</label>
                                        <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3} placeholder="Tell us more about your requirement" className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-blue-500/20 resize-none" />
                                    </div>
                                    <button
                                        disabled={sending}
                                        type="submit"
                                        className="w-full bg-[#356DA4] text-white py-5 rounded-2xl text-lg font-black shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center"
                                    >
                                        {sending ? "Processing..." : "Submit Inquiry"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
