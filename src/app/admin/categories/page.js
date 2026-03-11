// src/app/admin/categories/page.js
"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchCategories = () => {
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then(setCategories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            if (!res.ok) throw new Error("Failed");
            const created = await res.json();
            setCategories([...categories, created]);
            setNewName("");
        } catch {
            setError("Could not add category");
        }
    };

    const deleteCategory = async (id) => {
        if (!confirm("Delete this category? Products in this category might prevent deletion.")) return;
        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok) {
                setCategories(categories.filter(c => c.id !== id));
            } else {
                alert(data.error || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (c) => {
        setEditingId(c.id);
        setEditName(c.name);
    };

    const saveEdit = async () => {
        try {
            const res = await fetch(`/api/admin/categories/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName }),
            });
            if (res.ok) {
                setCategories(categories.map(c => c.id === editingId ? { ...c, name: editName } : c));
                setEditingId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Structure Categories</h1>
                <p className="text-slate-500 font-medium">Define categories to organize your products effectively.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Add Category Form */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-fit sticky top-10">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Create New</h2>
                    <form onSubmit={addCategory} className="space-y-4">
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g. Health & Wellness"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                            required
                        />
                        <button className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl hover:brightness-110 active:scale-95 transition-all">
                            Save Category
                        </button>
                    </form>
                    {error && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>}
                </div>

                {/* List Categories */}
                <div className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">Active Categories</h2>
                    {categories.length > 0 ? categories.map((c) => (
                        <div
                            key={c.id}
                            className={`group flex items-center justify-between p-5 rounded-[24px] border border-slate-100 bg-white transition-all hover:shadow-lg ${editingId === c.id ? 'ring-2 ring-blue-500 border-transparent shadow-blue-100' : ''}`}
                        >
                            {editingId === c.id ? (
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onBlur={saveEdit}
                                    autoFocus
                                    className="bg-transparent border-none outline-none font-bold text-slate-900 flex-1 py-1"
                                />
                            ) : (
                                <span className="font-bold text-slate-700">{c.name}</span>
                            )}

                            <div className="flex items-center gap-1 opacity-10 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => startEdit(c)}
                                    className="p-2 text-slate-500 hover:text-blue-500 transition"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </button>
                                <button
                                    onClick={() => deleteCategory(c.id)}
                                    className="p-2 text-slate-500 hover:text-red-500 transition"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[32px] italic text-slate-300 font-medium">
                            No categories yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
