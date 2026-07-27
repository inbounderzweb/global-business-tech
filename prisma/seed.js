// prisma/seed.js
// Idempotent seed for the category-first navigation + brand filters (Phase 1).
// Run with: node prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const CATEGORIES = [
  'Audio Conferencing',
  'Video Conferencing',
  'Interactive Displays',
  'Professional Headsets',
  'Webcams',
  'Meeting Room Solutions',
  'Controllers',
  'Room Booking',
  'Digital Signage',
  'Networking',
  'Storage',
  'Security',
];

const BRANDS = [
  'HP Poly',
  'Logitech',
  'Cisco',
  'Samsung',
  'Panasonic',
  'Zebra',
  'Barco',
  'Dell',
  'Lenovo',
  'Acer',
  'Asus',
  'Adobe',
  'Microsoft',
  'Honeywell',
];

async function seedCategories() {
  for (const name of CATEGORIES) {
    const slug = slugify(name);
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      if (!existing.slug) {
        await prisma.category.update({ where: { id: existing.id }, data: { slug } });
        console.log(`Backfilled slug for existing category "${name}" -> ${slug}`);
      }
      continue;
    }
    await prisma.category.create({ data: { name, slug } });
    console.log(`Created category "${name}" -> ${slug}`);
  }

  // Backfill slugs for any other pre-existing categories not in the list above.
  const withoutSlug = await prisma.category.findMany({ where: { slug: null } });
  for (const cat of withoutSlug) {
    await prisma.category.update({ where: { id: cat.id }, data: { slug: slugify(cat.name) } });
    console.log(`Backfilled slug for legacy category "${cat.name}"`);
  }
}

async function seedBrands() {
  for (const name of BRANDS) {
    const slug = slugify(name);
    const existing = await prisma.brand.findUnique({ where: { name } });
    if (existing) continue;
    await prisma.brand.create({ data: { name, slug } });
    console.log(`Created brand "${name}" -> ${slug}`);
  }
}

async function main() {
  await seedCategories();
  await seedBrands();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
