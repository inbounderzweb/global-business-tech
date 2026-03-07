"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("adminAuth");
        }
        router.push("/admin/login");
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-6">Welcome, admin! Here you can manage the site.</p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
}
