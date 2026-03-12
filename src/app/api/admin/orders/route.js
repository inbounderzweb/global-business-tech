// src/app/api/admin/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                product: true
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, phone, address, message, productId } = data;

        const missing = [];
        if (!name) missing.push("name");
        if (!email) missing.push("email");
        if (!phone) missing.push("phone");
        if (!address) missing.push("address");
        if (!productId) missing.push("productId");

        if (missing.length > 0) {
            return NextResponse.json({ error: "Missing required fields", missing }, { status: 400 });
        }

        const newOrder = await prisma.order.create({
            data: {
                name,
                email,
                phone,
                address,
                message: message || null,
                productId: parseInt(productId)
            }
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({
            error: "Failed to submit enquiry",
            details: error.message
        }, { status: 500 });
    }
}
