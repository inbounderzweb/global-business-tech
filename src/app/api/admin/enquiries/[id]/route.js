// src/app/api/admin/enquiries/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request, { params: paramsPromise }) {
    const params = await paramsPromise;
    try {
        await prisma.enquiry.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
    }
}

export async function PUT(request, { params: paramsPromise }) {
    const params = await paramsPromise;
    try {
        const { status } = await request.json();
        const updated = await prisma.enquiry.update({
            where: { id: parseInt(params.id) },
            data: { status }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating enquiry:", error);
        return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
    }
}
