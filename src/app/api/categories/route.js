// src/app/api/categories/route.js
// Public read-only endpoint for storefront navigation and category pages.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true, slug: true, description: true },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Could not fetch categories" }, { status: 500 });
    }
}
