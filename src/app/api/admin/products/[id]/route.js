// src/app/api/admin/products/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: { variants: true }
        });
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const { name, description, price, categoryId, variants, mainImage, gallery } = data;

        // Delete existing variants first for a clean update
        await prisma.variant.deleteMany({ where: { productId: parseInt(id) } });

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                mainImage,
                gallery: Array.isArray(gallery) ? JSON.stringify(gallery) : gallery,
                variants: variants && variants.length > 0 ? {
                    create: variants.map(v => ({
                        name: v.name,
                        price: parseFloat(v.price),
                        image: v.image || ""
                    }))
                } : undefined
            }
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // Variants will be deleted automatically if we have cascade, 
        // but it's safer to do it manually if not sure.
        await prisma.variant.deleteMany({ where: { productId: parseInt(id) } });
        await prisma.product.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
