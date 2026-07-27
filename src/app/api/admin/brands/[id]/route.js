// src/app/api/admin/brands/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { name, logoUrl } = await request.json();
        const data = {};
        if (name !== undefined) {
            data.name = name;
            data.slug = slugify(name);
        }
        if (logoUrl !== undefined) data.logoUrl = logoUrl;

        const updated = await prisma.brand.update({
            where: { id: parseInt(id) },
            data,
        });
        return NextResponse.json(updated);
    } catch (error) {
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
        return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
    }
}
