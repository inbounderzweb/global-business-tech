// src/app/api/admin/brands/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { name, logoUrl } = await request.json();

        const data = { updatedAt: new Date() };
        if (name !== undefined) {
            const trimmedName = name.trim();
            data.name = trimmedName;
            data.slug = trimmedName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
        }
        if (logoUrl !== undefined) data.logoUrl = logoUrl;

        const updated = await prisma.brand.update({
            where: { id: parseInt(id) },
            data,
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating brand:", error);
        return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const productsCount = await prisma.product.count({ where: { brandId: parseInt(id) } });
        if (productsCount > 0) {
            return NextResponse.json({ error: "Cannot delete brand with existing products" }, { status: 400 });
        }
        await prisma.brand.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Brand deleted" });
    } catch (error) {
        console.error("Error deleting brand:", error);
        return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
    }
}
