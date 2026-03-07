import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis;
if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    globalForPrisma.prisma = new PrismaClient({ adapter });
}
const prisma = globalForPrisma.prisma;

// GET /api/admin/categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' }
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
        const { name } = body;

        if (!name || name.trim() === '') {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        // Check if category already exists
        const existingCategory = await prisma.category.findUnique({
            where: { name: name.trim() }
        });

        if (existingCategory) {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }

        // Create the new category
        const category = await prisma.category.create({
            data: {
                name: name.trim()
            }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Could not create category" }, { status: 500 });
    }
}
