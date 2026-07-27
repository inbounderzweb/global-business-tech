// src/app/api/admin/blogs/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/blogs
export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Could not fetch blogs" }, { status: 500 });
    }
}

// POST /api/admin/blogs
export async function POST(req) {
    try {
        const body = await req.json();
        const { title, description, shortDescription, image, author } = body;

        if (!title || !description || !author) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const blog = await prisma.blog.create({
            data: {
                title,
                shortDescription: shortDescription || "",
                description,
                image: image || "",
                author,
                date: new Date(),
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Could not create blog" }, { status: 500 });
    }
}
