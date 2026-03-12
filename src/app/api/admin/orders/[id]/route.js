// src/app/api/admin/orders/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params: paramsPromise }) {
    const params = await paramsPromise;
    try {
        const { status } = await request.json();
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(params.id) },
            data: { status }
        });
        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}

export async function DELETE(request, { params: paramsPromise }) {
    const params = await paramsPromise;
    try {
        await prisma.order.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ message: "Order deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
