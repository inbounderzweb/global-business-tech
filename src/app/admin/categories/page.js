// src/app/admin/categories/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/admin/categories")
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    const addCategory = async (e) => {
        e.preventDefault();
        setError("");

        console.log("Add Category Form Submitted:", { name: newName });

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

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>
            <form onSubmit={addCategory} className="flex gap-2 mb-4">
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New category name"
                    className="border rounded px-3 py-2 flex-1"
                    required
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
            </form>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <ul className="space-y-2">
                {categories.map((c) => (
                    <li key={c.id} className="p-2 border rounded bg-white shadow-sm">
                        {c.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
