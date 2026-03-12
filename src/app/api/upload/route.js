// src/app/api/upload/route.js
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const MAX_SIZE = 1 * 1024 * 1024; // 1MB
        if (file.size > MAX_SIZE) {
            return NextResponse.json({
                error: `File too large. Maximum size is 1MB. (Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}-${file.name.replace(/\s+/g, "-")}`;

        // Path to save the file
        const path = join(process.cwd(), "public/uploads", fileName);

        // Ensure directory exists (just in case)
        await mkdir(join(process.cwd(), "public/uploads"), { recursive: true });

        // Save file
        await writeFile(path, buffer);
        console.log(`File saved to ${path}`);

        // Return the relative URL for public access
        const fileUrl = `/uploads/${fileName}`;
        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
