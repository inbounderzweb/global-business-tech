// src/app/api/admin/brands/route.js
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

// GET /api/admin/brands
export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: { createdAt: "desc" },
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
        const existingBrand = await prisma.brand.findUnique({ where: { name: trimmedName } });
        if (existingBrand) {
            return NextResponse.json({ error: "Brand already exists" }, { status: 400 });
        }

        const brand = await prisma.brand.create({
            data: { name: trimmedName, slug: slugify(trimmedName), logoUrl: logoUrl || null },
        });

        return NextResponse.json(brand, { status: 201 });
    } catch (error) {
        console.error("Error creating brand:", error);
        return NextResponse.json({ error: "Could not create brand" }, { status: 500 });
    }
}
