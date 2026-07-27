// src/app/sitemap.js
import { prisma } from '@/lib/prisma';
import { SITE_URL } from '@/lib/siteConfig';

const STATIC_ROUTES = [
  '',
  '/about',
  '/contact',
  '/blog',
  '/products',
  '/productdetails',
  '/solutions',
];

export default async function sitemap() {
  const [categories, products, blogs] = await Promise.all([
    prisma.category.findMany({ where: { slug: { not: null } }, select: { slug: true, updatedAt: true } }),
    prisma.product.findMany({ select: { id: true, updatedAt: true } }),
    prisma.blog.findMany({ select: { id: true, updatedAt: true } }),
  ]);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${SITE_URL}/products/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/productdetail/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.id}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
