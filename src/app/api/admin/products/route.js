// src/app/api/admin/products/route.js
import { NextResponse } from "next/server";

let products = [];

export async function GET() {
    return NextResponse.json(products);
}

export async function POST(request) {
    const data = await request.json();
    const id = Date.now().toString();
    const newProduct = { id, ...data };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
