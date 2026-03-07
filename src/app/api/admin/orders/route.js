// src/app/api/admin/orders/route.js
import { NextResponse } from "next/server";

const orders = [
    { id: "1", product: "Product A", amount: "$100", status: "Shipped", date: "2026-03-01" },
    { id: "2", product: "Product B", amount: "$200", status: "Processing", date: "2026-03-02" },
];

export async function GET() {
    return NextResponse.json(orders);
}

export async function POST(request) {
    const data = await request.json();
    const id = Date.now().toString();
    const newOrder = { id, ...data };
    orders.push(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
}
