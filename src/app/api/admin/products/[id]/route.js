// src/app/api/admin/products/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params: paramsPromise }) {
    try {
        const params = await paramsPromise;
        const { id } = params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: { variants: true, categories: true }
        });
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PUT(request, { params: paramsPromise }) {
    try {
        const params = await paramsPromise;
        const { id } = params;
        const data = await request.json();
        const { name, description, price, categoryIds, variants, mainImage, gallery } = data;

        // Delete existing variants first for a clean update
        await prisma.variant.deleteMany({ where: { productId: parseInt(id) } });

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: parseFloat(price),
                categories: {
                    set: categoryIds ? categoryIds.map(id => ({ id: parseInt(id) })) : []
                },
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
        return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(request, { params: paramsPromise }) {
    try {
        const params = await paramsPromise;
        const id = parseInt(params.id);

        // Clean up everything linked to this product to avoid foreign key errors
        await prisma.order.deleteMany({ where: { productId: id } });
        await prisma.variant.deleteMany({ where: { productId: id } });

        await prisma.product.delete({ where: { id: id } });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({
            error: "Failed to delete product",
            details: error.message
        }, { status: 500 });
    }
}
