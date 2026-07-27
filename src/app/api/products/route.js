// src/app/api/products/route.js
// Public storefront endpoint: category browsing with search, brand/platform/
// certification filters, sorting and pagination.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SORTERS = {
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
};

function parseJsonArray(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const categorySlug = searchParams.get("category");
        const q = searchParams.get("q")?.trim();
        const sort = searchParams.get("sort") || "newest";
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "12", 10));

        const brandIds = searchParams.getAll("brand").map((v) => parseInt(v)).filter(Boolean);
        const platformValues = searchParams.getAll("platform");
        const certificationValues = searchParams.getAll("certification");

        const where = {};
        if (categorySlug) where.categories = { some: { slug: categorySlug } };
        if (q) {
            where.OR = [
                { name: { contains: q } },
                { description: { contains: q } },
            ];
        }

        // Fetch the category+search scoped set once; facets and filters are then
        // computed in-memory since platforms/certifications aren't normalized columns.
        const scoped = await prisma.product.findMany({
            where,
            include: { brand: true, categories: true },
            orderBy: { createdAt: "desc" },
        });

        const facetBrands = new Map();
        const facetPlatforms = new Set();
        const facetCertifications = new Set();
        for (const p of scoped) {
            if (p.brand) facetBrands.set(p.brand.id, p.brand.name);
            parseJsonArray(p.platforms).forEach((v) => facetPlatforms.add(v));
            parseJsonArray(p.certifications).forEach((v) => facetCertifications.add(v));
        }

        let filtered = scoped.filter((p) => {
            if (brandIds.length > 0 && (!p.brand || !brandIds.includes(p.brand.id))) return false;
            if (platformValues.length > 0) {
                const productPlatforms = parseJsonArray(p.platforms);
                if (!platformValues.some((v) => productPlatforms.includes(v))) return false;
            }
            if (certificationValues.length > 0) {
                const productCertifications = parseJsonArray(p.certifications);
                if (!certificationValues.some((v) => productCertifications.includes(v))) return false;
            }
            return true;
        });

        filtered = filtered.sort(SORTERS[sort] || SORTERS.newest);

        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const products = filtered.slice(start, start + pageSize).map((p) => ({
            ...p,
            platforms: parseJsonArray(p.platforms),
            certifications: parseJsonArray(p.certifications),
        }));

        return NextResponse.json({
            products,
            total,
            page,
            pageSize,
            facets: {
                brands: Array.from(facetBrands, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name)),
                platforms: Array.from(facetPlatforms).sort(),
                certifications: Array.from(facetCertifications).sort(),
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Could not fetch products" }, { status: 500 });
    }
}
