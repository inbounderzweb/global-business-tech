// src/app/admin/orders/page.js
"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = () => {
        setLoading(true);
        fetch("/api/admin/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteOrder = async (id) => {
        if (!confirm("Delete this order?")) return;
        try {
            await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Product Enquiries (Orders)</h1>
                <p className="text-slate-500">Manage customer enquiries and order requests for specific products.</p>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">Loading enquiries...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">No enquiries yet</td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {order.product?.mainImage && (
                                                <img src={order.product.mainImage} className="h-10 w-10 rounded-lg object-cover bg-slate-100" />
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-900">{order.product?.name || "Deleted Product"}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-black">ID: #{order.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-700">{order.name}</p>
                                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{order.address}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-600">{order.email}</p>
                                        <p className="text-sm text-slate-400 font-bold">{order.phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer transition-all
                                                ${order.status === 'pending' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200' : ''}
                                                ${order.status === 'processed' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' : ''}
                                                ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : ''}
                                                ${order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200' : ''}
                                            `}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processed">Processed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                                                title="View Details"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                                            </button>
                                            <button
                                                onClick={() => deleteOrder(order.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl overflow-hidden">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Enquiry Details</h2>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Order ID: #{selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">Customer</label>
                                    <p className="font-bold text-slate-900 text-lg">{selectedOrder.name}</p>
                                    <p className="text-slate-500 text-sm">{selectedOrder.email}</p>
                                    <p className="text-slate-900 font-bold mt-1">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">Delivery Address</label>
                                    <p className="text-slate-600 italic leading-relaxed">{selectedOrder.address}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase font-black text-slate-400 block mb-2">Interested Product</label>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        {selectedOrder.product?.mainImage && (
                                            <img src={selectedOrder.product.mainImage} className="h-12 w-12 rounded-lg object-cover" />
                                        )}
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{selectedOrder.product?.name}</p>
                                            <p className="text-xs text-blue-600 font-black">₹{selectedOrder.product?.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">Customer Message</label>
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-700 text-sm leading-relaxed">
                                        {selectedOrder.message || "No specific message provided."}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4 pt-8 border-t border-slate-50">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all hover:brightness-125"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
