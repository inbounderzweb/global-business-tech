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
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Customer Orders</h1>
                <p className="text-sm text-slate-600">Track and manage recent transactions and shipment statuses.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {orders.length > 0 ? orders.map((o) => (
                            <tr key={o.id} className="hover:bg-slate-50/50 transition">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">#{o.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{o.product}</td>
                                <td className="px-6 py-4 font-semibold text-slate-900">₹{o.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${o.status === "Completed" ? "bg-emerald-50 text-emerald-700" :
                                            o.status === "Pending" ? "bg-amber-50 text-amber-700" :
                                                "bg-slate-50 text-slate-700"
                                        }`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-slate-500 whitespace-nowrap">{o.date}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
