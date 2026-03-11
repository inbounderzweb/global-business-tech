// src/app/api/admin/categories/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { name } = await request.json();
        const updated = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // Check if products exist
        const productsCount = await prisma.product.count({ where: { categoryId: parseInt(id) } });
        if (productsCount > 0) {
            return NextResponse.json({ error: "Cannot delete category with existing products" }, { status: 400 });
        }
        await prisma.category.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
