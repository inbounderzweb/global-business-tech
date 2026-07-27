// src/app/productdetail/[id]/page.js
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/siteConfig';
import { breadcrumbJsonLd } from '@/components/products/Breadcrumb';
import ProductDetailClient from '@/components/productdetail/ProductDetailClient';

async function getProduct(id) {
    const productId = parseInt(id, 10);
    if (Number.isNaN(productId)) return null;
    return prisma.product.findUnique({
        where: { id: productId },
        include: { brand: true, categories: true },
    });
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) return { title: 'Product Not Found' };

    const description = (product.description || '').replace(/\s+/g, ' ').trim().slice(0, 160);

    return {
        title: `${product.name} | Global Business Tech`,
        description,
        alternates: {
            canonical: `${SITE_URL}/productdetail/${product.id}`,
        },
        openGraph: {
            title: product.name,
            description,
            images: product.mainImage ? [product.mainImage] : [],
        },
    };
}

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    const primaryCategory = product.categories?.[0];
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        ...(primaryCategory ? [{ label: primaryCategory.name, href: `/products/category/${primaryCategory.slug}` }] : []),
        { label: product.name },
    ];

    const faqs = product.faqs ? JSON.parse(product.faqs) : [];

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || undefined,
        image: product.mainImage ? [`${SITE_URL}${product.mainImage}`] : undefined,
        brand: product.brand ? { '@type': 'Brand', name: product.brand.name } : undefined,
        category: primaryCategory?.name,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.price,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/productdetail/${product.id}`,
        },
    };

    const faqJsonLd = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems, SITE_URL)) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <ProductDetailClient
                product={{ ...product, faqs }}
                breadcrumbItems={breadcrumbItems}
            />
        </>
    );
}
