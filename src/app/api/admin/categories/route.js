// src/app/api/admin/categories/route.js
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

// GET /api/admin/categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Could not fetch categories" }, { status: 500 });
    }
}

// POST /api/admin/categories
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description } = body;

        if (!name || name.trim() === "") {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const trimmedName = name.trim();

        // Check if category already exists
        const existingCategory = await prisma.category.findUnique({
            where: { name: trimmedName },
        });

        if (existingCategory) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }

        // Create the new category
        const category = await prisma.category.create({
            data: { name: trimmedName, slug: slugify(trimmedName), description: description || null },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Could not create category" }, { status: 500 });
    }
}
