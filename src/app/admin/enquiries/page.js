// src/app/admin/enquiries/page.js
"use client";

import { useEffect, useState } from "react";

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = () => {
        setLoading(true);
        fetch("/api/admin/enquiries")
            .then(res => res.json())
            .then(data => {
                setEnquiries(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const deleteEnquiry = async (id) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            const res = await fetch(`/api/admin/enquiries/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                fetchEnquiries();
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/admin/enquiries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchEnquiries();
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Enquiries</h1>
                    <p className="text-slate-500 font-light mt-1">Manage and respond to messages from your website contact forms.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    <div className="p-12 text-center text-slate-400 font-bold bg-white rounded-[32px] border border-slate-100">
                        Loading messages...
                    </div>
                ) : enquiries.length > 0 ? enquiries.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div>
                                <select
                                    value={item.status}
                                    onChange={(e) => updateStatus(item.id, e.target.value)}
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mb-2 border-0 cursor-pointer outline-none transition-all
                                        ${item.status === 'read' ? 'bg-slate-100 text-slate-600' : ''}
                                        ${item.status === 'replied' ? 'bg-emerald-50 text-emerald-600' : ''}
                                        ${item.status === 'pending' ? 'bg-blue-50 text-blue-600' : ''}
                                    `}
                                >
                                    <option value="pending">PENDING</option>
                                    <option value="read">READ</option>
                                    <option value="replied">REPLIED</option>
                                </select>
                                <h3 className="text-xl font-bold text-slate-900">{item.subject || "No Subject"}</h3>
                                <p className="text-sm text-slate-500 mt-1">From: <span className="font-bold text-slate-700">{item.name}</span> ({item.email})</p>
                                {item.phone && <p className="text-xs text-slate-400 mt-0.5 font-bold">Contact: {item.phone}</p>}
                            </div>
                            <div className="flex flex-col items-end gap-2 text-right">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-slate-300 font-medium">{new Date(item.createdAt).toLocaleTimeString()}</p>
                                </div>
                                <button
                                    onClick={() => deleteEnquiry(item.id)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Delete Enquiry"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed font-medium">
                            {item.message}
                        </div>
                    </div>
                )) : (
                    <div className="p-12 text-center text-slate-400 font-bold bg-white rounded-[32px] border border-slate-100">
                        No enquiries found yet.
                    </div>
                )}
            </div>
        </div>
    );
}
