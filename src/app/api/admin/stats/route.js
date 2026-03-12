// src/app/api/admin/stats/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const [
            productsCount,
            enquiriesCount,
            pendingEnquiries,
            blogsCount,
            ordersCount,
            pendingOrders
        ] = await Promise.all([
            prisma.product.count(),
            prisma.enquiry.count(),
            prisma.enquiry.count({ where: { status: "pending" } }),
            prisma.blog.count(),
            prisma.order.count(),
            prisma.order.count({ where: { status: "pending" } })
        ]);

        return NextResponse.json({
            products: productsCount,
            enquiries: enquiriesCount,
            pendingEnquiries,
            blogs: blogsCount,
            orders: ordersCount,
            pendingOrders
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
