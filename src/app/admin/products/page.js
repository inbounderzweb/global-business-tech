// src/app/admin/products/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/admin/products")
            .then((res) => res.json())
            .then(setProducts);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <Link
                href="/admin/products/create"
                className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + Add Product
            </Link>
            <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Selling Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.category}</td>
                            <td className="p-2">{p.sellingPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
