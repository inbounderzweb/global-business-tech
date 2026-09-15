// src/app/api/admin/products/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { categories: true, variants: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, description, price, categoryIds, variants, mainImage, gallery } = data;

        if (!name || !price || !categoryIds || categoryIds.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description: description || "",
                price: parseFloat(price),
                categories: { connect: categoryIds.map(id => ({ id: parseInt(id) })) },
                mainImage: mainImage || "",
                gallery: Array.isArray(gallery) ? JSON.stringify(gallery) : (gallery || ""),
                variants: variants && variants.length > 0 ? {
                    create: variants.map(v => ({
                        name: v.name,
                        price: parseFloat(v.price),
                        image: v.image || ""
                    }))
                } : undefined
            },
            include: {
                categories: true,
                variants: true
            }
        });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
