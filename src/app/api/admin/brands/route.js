// src/app/api/admin/brands/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/brands
export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: "asc" },
        });
        return NextResponse.json(brands, { status: 200 });
    } catch (error) {
        console.error("Error fetching brands:", error);
        return NextResponse.json({ error: "Could not fetch brands" }, { status: 500 });
    }
}

// POST /api/admin/brands
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, logoUrl } = body;

        if (!name || name.trim() === "") {
            return NextResponse.json({ error: "Brand name is required" }, { status: 400 });
        }

        const trimmedName = name.trim();
        const slug = trimmedName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const existingBrand = await prisma.brand.findFirst({
            where: { OR: [{ name: trimmedName }, { slug }] },
        });

        if (existingBrand) {
            return NextResponse.json({ error: "Brand already exists" }, { status: 400 });
        }

        const brand = await prisma.brand.create({
            data: {
                name: trimmedName,
                slug,
                logoUrl: logoUrl || null,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(brand, { status: 201 });
    } catch (error) {
        console.error("Error creating brand:", error);
        return NextResponse.json({ error: "Could not create brand" }, { status: 500 });
    }
}
