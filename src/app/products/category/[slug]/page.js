// src/app/products/category/[slug]/page.js
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/siteConfig';
import Banner from '@/components/productpagecomponents/Banner';
import Breadcrumb, { breadcrumbJsonLd } from '@/components/products/Breadcrumb';
import CategoryPageClient from '@/components/products/CategoryPageClient';

async function getCategory(slug) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} | Global Business Tech`,
    description: category.description || `Explore our range of ${category.name} from leading global brands.`,
    alternates: {
      canonical: `${SITE_URL}/products/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: category.name },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems, SITE_URL)) }}
      />
      <Banner title={category.name} subtitle="Product Category" />
      <Breadcrumb items={breadcrumbItems} />

      {category.description && (
        <div className="w-full xl:w-[90%] mx-auto px-4 pt-10">
          <p className="max-w-3xl text-slate-600 leading-relaxed">{category.description}</p>
        </div>
      )}

      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading...</div>}>
        <CategoryPageClient slug={slug} categoryName={category.name} />
      </Suspense>
    </div>
  );
}
