// src/components/AdminSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/products" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Customers", href: "/admin/customers" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    return (
        <nav className="flex flex-col space-y-2 p-4 bg-gray-800 text-white min-h-screen">
            {sections.map((sec) => (
                <Link
                    key={sec.href}
                    href={sec.href}
                    className={`px-3 py-2 rounded hover:bg-gray-700 transition ${pathname === sec.href ? "bg-gray-700 font-semibold" : ""}`}
                >
                    {sec.name}
                </Link>
            ))}
        </nav>
    );
}
