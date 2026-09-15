const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE '%ategor%'"
  );
  console.log('Tables:', tables);

  const totalProducts = await prisma.$queryRawUnsafe("SELECT COUNT(*) as c FROM `Product`");
  console.log('Total products:', totalProducts);

  const categories = await prisma.$queryRawUnsafe("SELECT * FROM `Category`");
  console.log('Categories:', categories);

  const counts = await prisma.$queryRawUnsafe(
    "SELECT B as productId, COUNT(*) as catCount FROM `_CategoryToProduct` GROUP BY B ORDER BY catCount DESC"
  ).catch(e => 'ERR: ' + e.message);
  console.log('Per-product category counts:', counts);

  const multiCat = await prisma.$queryRawUnsafe(
    "SELECT B as productId, COUNT(*) as catCount FROM `_CategoryToProduct` GROUP BY B HAVING catCount > 1"
  ).catch(e => 'ERR: ' + e.message);
  console.log('Products with >1 category:', multiCat);

  const noCat = await prisma.$queryRawUnsafe(
    "SELECT p.id, p.name FROM `Product` p LEFT JOIN `_CategoryToProduct` c ON c.B = p.id WHERE c.B IS NULL"
  ).catch(e => 'ERR: ' + e.message);
  console.log('Products with 0 categories:', noCat);
}

main().finally(() => prisma.$disconnect());
