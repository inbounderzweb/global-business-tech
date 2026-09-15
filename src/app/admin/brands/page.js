// src/app/admin/brands/page.js
"use client";

import { useEffect, useState } from "react";

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [newName, setNewName] = useState("");
    const [newLogo, setNewLogo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editLogo, setEditLogo] = useState("");
    const [uploading, setUploading] = useState(null);
    const [error, setError] = useState("");

    const fetchBrands = () => {
        fetch("/api/admin/brands")
            .then((res) => res.json())
            .then(setBrands);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const uploadLogo = async (file, fieldId) => {
        if (!file) return null;
        if (file.size > 1 * 1024 * 1024) {
            setError(`File "${file.name}" is too large. Max size is 1MB.`);
            return null;
        }
        setUploading(fieldId);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
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

    const addBrand = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("/api/admin/brands", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName, logoUrl: newLogo }),
            });
            const created = await res.json();
            if (!res.ok) throw new Error(created.error || "Failed");
            setBrands([...brands, { ...created, _count: { products: 0 } }]);
            setNewName("");
            setNewLogo("");
        } catch (err) {
            setError(err.message || "Could not add brand");
        }
    };

    const deleteBrand = async (id) => {
        if (!confirm("Delete this brand? Products assigned to this brand might prevent deletion.")) return;
        try {
            const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok) {
                setBrands(brands.filter((b) => b.id !== id));
            } else {
                alert(data.error || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (b) => {
        setEditingId(b.id);
        setEditName(b.name);
        setEditLogo(b.logoUrl || "");
    };

    const saveEdit = async () => {
        try {
            const res = await fetch(`/api/admin/brands/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName, logoUrl: editLogo }),
            });
            if (res.ok) {
                const updated = await res.json();
                setBrands(brands.map((b) => (b.id === editingId ? { ...b, ...updated } : b)));
                setEditingId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Brands</h1>
                <p className="text-slate-500 font-medium">Add the brands you carry so products can be grouped by brand on the storefront.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Add Brand Form */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-fit sticky top-10">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Create New</h2>
                    <form onSubmit={addBrand} className="space-y-4">
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g. Samsung"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                            required
                        />

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 ml-1 uppercase tracking-wider">Logo</label>
                            <div className={`relative h-28 w-full rounded-2xl border-2 border-dashed transition-all flex items-center justify-center overflow-hidden bg-slate-50/50 ${newLogo ? "border-solid border-blue-200" : "border-slate-200 hover:border-blue-400"}`}>
                                {newLogo ? (
                                    <>
                                        <img src={newLogo} className="h-full w-full object-contain p-3" alt="Logo preview" />
                                        <button type="button" onClick={() => setNewLogo("")} className="absolute top-2 right-2 h-8 w-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </>
                                ) : uploading === "new" ? (
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                                ) : (
                                    <>
                                        <p className="text-xs font-bold text-slate-400">Upload logo</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={async (e) => {
                                                const url = await uploadLogo(e.target.files[0], "new");
                                                if (url) setNewLogo(url);
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            disabled={uploading === "new"}
                            className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                        >
                            Save Brand
                        </button>
                    </form>
                    {error && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>}
                </div>

                {/* List Brands */}
                <div className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">Active Brands</h2>
                    {brands.length > 0 ? brands.map((b) => (
                        <div
                            key={b.id}
                            className={`group flex items-center gap-4 p-5 rounded-[24px] border border-slate-100 bg-white transition-all hover:shadow-lg ${editingId === b.id ? "ring-2 ring-blue-500 border-transparent shadow-blue-100" : ""}`}
                        >
                            <div className="relative h-12 w-12 shrink-0 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-center overflow-hidden">
                                {editingId === b.id ? (
                                    <>
                                        {editLogo ? (
                                            <img src={editLogo} className="h-full w-full object-contain p-1" alt="Logo" />
                                        ) : uploading === b.id ? (
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                                        ) : (
                                            <span className="text-[9px] font-bold text-slate-400">Logo</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={async (e) => {
                                                const url = await uploadLogo(e.target.files[0], b.id);
                                                if (url) setEditLogo(url);
                                            }}
                                        />
                                    </>
                                ) : b.logoUrl ? (
                                    <img src={b.logoUrl} className="h-full w-full object-contain p-1" alt={b.name} />
                                ) : (
                                    <span className="text-sm font-black text-slate-300">{b.name?.[0]}</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                {editingId === b.id ? (
                                    <input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={saveEdit}
                                        autoFocus
                                        className="bg-transparent border-none outline-none font-bold text-slate-900 w-full py-1"
                                    />
                                ) : (
                                    <>
                                        <span className="font-bold text-slate-700 block truncate">{b.name}</span>
                                        <span className="text-[11px] font-bold text-slate-400">{b._count?.products ?? 0} product{(b._count?.products ?? 0) !== 1 ? 's' : ''}</span>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-1 opacity-10 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(b)} className="p-2 text-slate-500 hover:text-blue-500 transition">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </button>
                                <button onClick={() => deleteBrand(b.id)} className="p-2 text-slate-500 hover:text-red-500 transition">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[32px] italic text-slate-300 font-medium">
                            No brands yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
