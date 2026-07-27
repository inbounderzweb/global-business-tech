// src/app/api/enquiries/route.js
// Public endpoint for lead-gen forms (e.g. "Request Quote" on category pages).
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
        }

        const enquiry = await prisma.enquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message,
            },
        });

        return NextResponse.json({ id: enquiry.id }, { status: 201 });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return NextResponse.json({ error: "Could not submit enquiry" }, { status: 500 });
    }
}
