// src/app/api/admin/products/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true, variants: true },
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
        const { name, description, price, categoryId, variants, mainImage, thumbnail, gallery } = data;

        if (!name || !price || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description: description || "",
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                mainImage: mainImage || "",
                thumbnail: thumbnail || "",
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
                variants: true
            }
        });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
