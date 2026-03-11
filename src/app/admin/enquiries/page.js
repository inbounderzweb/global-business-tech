// src/app/admin/enquiries/page.js
"use client";

import { useEffect, useState } from "react";

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/enquiries")
            .then(res => res.json())
            .then(data => {
                setEnquiries(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Enquiries</h1>
                <p className="text-slate-500 font-light mt-1">Manage and respond to messages from your website contact forms.</p>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    <div className="p-12 text-center text-slate-400 font-bold bg-white rounded-[32px] border border-slate-100">
                        Loading messages...
                    </div>
                ) : enquiries.length > 0 ? enquiries.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 mb-2">
                                    {item.status.toUpperCase()}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900">{item.subject || "No Subject"}</h3>
                                <p className="text-sm text-slate-500 mt-1">From: <span className="font-bold text-slate-700">{item.name}</span> ({item.email})</p>
                                {item.phone && <p className="text-xs text-slate-400 mt-0.5">Contact: {item.phone}</p>}
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                                <p className="text-[10px] text-slate-300 font-medium">{new Date(item.createdAt).toLocaleTimeString()}</p>
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
