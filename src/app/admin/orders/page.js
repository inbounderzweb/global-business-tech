// src/app/admin/orders/page.js
"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("/api/admin/orders")
            .then((res) => res.json())
            .then(setOrders);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id} className="border-b">
                            <td className="p-2">{o.id}</td>
                            <td className="p-2">{o.product}</td>
                            <td className="p-2">{o.amount}</td>
                            <td className="p-2">{o.status}</td>
                            <td className="p-2">{o.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
