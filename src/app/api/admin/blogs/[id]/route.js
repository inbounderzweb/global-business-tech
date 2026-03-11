// src/app/api/admin/blogs/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const updated = await prisma.blog.update({
            where: { id: parseInt(id) },
            data: data
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.blog.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Blog deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
