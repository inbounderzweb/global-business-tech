// src/app/api/admin/products/route.js - Last update: 2026-03-31T12:00:00Z
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { categories: true, variants: true, brand: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, description, price, categoryIds, variants, mainImage, gallery, brandId, platforms, certifications, faqs } = data;

        if (!name || !price || !categoryIds || !Array.isArray(categoryIds)) {
            return NextResponse.json({ error: "Missing required fields or categoryIds is not an array" }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description: description || "",
                price: parseFloat(price),
                categories: {
                    connect: categoryIds.map(id => ({ id: parseInt(id) }))
                },
                brandId: brandId ? parseInt(brandId) : null,
                platforms: Array.isArray(platforms) ? JSON.stringify(platforms) : null,
                certifications: Array.isArray(certifications) ? JSON.stringify(certifications) : null,
                faqs: Array.isArray(faqs) ? JSON.stringify(faqs) : null,
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
                variants: true,
                categories: true
            }
        });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
    }
}
