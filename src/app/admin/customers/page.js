// src/app/admin/customers/page.js
"use client";

import { useEffect, useState } from "react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("/api/admin/customers")
            .then((res) => res.json())
            .then(setCustomers);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Customers</h1>
            <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c.id} className="border-b">
                            <td className="p-2">{c.name}</td>
                            <td className="p-2">{c.email}</td>
                            <td className="p-2">{c.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
