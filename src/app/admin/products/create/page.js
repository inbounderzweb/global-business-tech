// src/app/admin/products/create/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(null);
    const [error, setError] = useState("");

    // Form states
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // Image states
    const [mainImage, setMainImage] = useState('');
    const [gallery, setGallery] = useState([]);

    // Variations states
    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState([{ name: '', price: '', image: '' }]);

    useEffect(() => {
        setLoading(true);
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const uploadFile = async (file, fieldId) => {
        if (!file) return null;
        setUploading(fieldId);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) return data.url;
            throw new Error(data.error || "Upload failed");
        } catch (err) {
            setError(`Upload error: ${err.message}`);
            return null;
        } finally {
            setUploading(null);
        }
    };

    const handleFileChange = async (e, type, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = await uploadFile(file, type + (index !== null ? index : ''));
        if (!url) return;

        if (type === 'main') setMainImage(url);
        if (type === 'gallery') setGallery([...gallery, url]);
        if (type === 'variant') {
            const newVariants = [...variants];
            newVariants[index].image = url;
            setVariants(newVariants);
        }
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const addVariant = () => setVariants([...variants, { name: '', price: '', image: '' }]);
    const removeVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
    const removeGalleryItem = (index) => setGallery(gallery.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!categoryId) {
            setError("Please select a category");
            return;
        }

        const formData = {
            name: productName,
            description,
            price,
            categoryId,
            mainImage,
            gallery,
            variants: hasVariants ? variants.filter(v => v.name && v.price) : []
        };

        try {
            setLoading(true);
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Could not add product");

            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create Product</h1>
                    <p className="mt-2 text-slate-500 font-medium">Add a new item to your catalog. Variations and gallery are optional.</p>
                </div>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Discard & Back
                </button>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900">General Information</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Product Title</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="e.g. Premium Wireless Headphones"
                                    className="w-full text-lg rounded-[24px] border border-slate-200 bg-slate-50/50 px-6 py-5 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-50/50 font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Detailed Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell your customers about the features and benefits..."
                                    className="w-full h-56 rounded-[24px] border border-slate-200 bg-slate-50/50 px-6 py-5 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-50/50 resize-none font-medium leading-relaxed"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Management - Removed Thumbnail per request */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900">Product Media</h2>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider mb-4">Main Cover Image</label>
                            <div className={`relative h-80 w-full rounded-[30px] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-slate-50/50 ${mainImage ? 'border-solid border-blue-200' : 'border-slate-200 hover:border-blue-400'}`}>
                                {mainImage ? (
                                    <>
                                        <img src={mainImage} className="absolute inset-0 h-full w-full object-cover" alt="Main" />
                                        <button type="button" onClick={() => setMainImage('')} className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 p-6 text-center">
                                        {uploading === 'main' ? (
                                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                                        ) : (
                                            <>
                                                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                                </div>
                                                <p className="text-sm font-bold text-slate-400">Select Image File</p>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'main')} accept="image/*" />
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gallery Upload */}
                        <div className="space-y-6 pt-6 border-t border-slate-50">
                            <label className="block text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">Additional Gallery Images</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {gallery.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-[24px] overflow-hidden group shadow-sm ring-1 ring-slate-100">
                                        <img src={url} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={() => removeGalleryItem(index)} className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="relative aspect-square rounded-[24px] border-2 border-dashed border-slate-200 hover:border-slate-400 flex flex-col items-center justify-center transition-colors bg-slate-50/30">
                                    {uploading === 'gallery' ? (
                                        <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-400 border-t-transparent" />
                                    ) : (
                                        <>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="M12 5v14M5 12h14" /></svg>
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'gallery')} accept="image/*" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Variations Management */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Product Variations</h2>
                            <button
                                type="button"
                                onClick={() => setHasVariants(!hasVariants)}
                                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out ${hasVariants ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition duration-300 ease-in-out ${hasVariants ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {hasVariants && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                {variants.map((v, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 rounded-[30px] bg-slate-50/50 border border-slate-100 items-start">
                                        <div className="relative h-24 w-24 rounded-2xl border-2 border-dashed border-slate-200 flex shrink-0 items-center justify-center overflow-hidden bg-white shadow-sm hover:border-blue-400 transition-colors">
                                            {v.image ? (
                                                <img src={v.image} className="h-full w-full object-cover" alt="V" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1">
                                                    {uploading === `variant${index}` ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                                                    ) : (
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                                    )}
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'variant', index)} accept="image/*" />
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Label</label>
                                                <input
                                                    type="text"
                                                    value={v.name}
                                                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                                    placeholder="e.g. Red / XL"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-blue-500"
                                                    required={hasVariants}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Price Adjust</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                                                    <input
                                                        type="number"
                                                        value={v.price}
                                                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                                        placeholder="0"
                                                        className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 text-sm font-bold outline-none focus:border-blue-500"
                                                        required={hasVariants}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[30px] text-sm font-extrabold text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-slate-50/20"
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                                    Add Another Variation
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-10">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900">Taxonomy</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Base Display Price</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xl">₹</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full text-3xl font-black rounded-[24px] border border-slate-200 bg-slate-50/50 pl-12 pr-6 py-6 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-8 focus:ring-blue-50/50"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Category</label>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full appearance-none rounded-[24px] border border-slate-200 bg-slate-50/50 px-6 py-5 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-50/50 cursor-pointer text-base font-bold text-slate-700"
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="sticky top-10 space-y-4">
                        <button
                            type="submit"
                            disabled={loading || !!uploading}
                            className={`group w-full flex items-center justify-center gap-3 rounded-[30px] py-6 text-xl font-black text-white shadow-2xl transition-all active:scale-95 disabled:opacity-50 ${loading ? 'bg-slate-700' : 'bg-slate-900 shadow-slate-200'}`}
                        >
                            {loading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-500 border-t-white" />
                            ) : (
                                "Publish Product"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}