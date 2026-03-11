// src/app/api/admin/enquiries/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const enquiries = await prisma.enquiry.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, phone, subject, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newEnquiry = await prisma.enquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || "No Subject",
                message
            }
        });
        return NextResponse.json(newEnquiry, { status: 201 });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }
}
