/* eslint-disable no-unused-vars */
import 'dotenv/config';
import prisma from '../src/db.js';
import menu from '../src/data/menu.json' with { type: 'json' };

await prisma.$executeRaw`TRUNCATE "Product", "Variant" RESTART IDENTITY CASCADE`;

const normalizedMenu = menu.map((item) => {
  const { id, ingredients, variants, date, ...normItem } = item;
  normItem.imageUrl ||= null;

  if (date) {
    const [day, month, year] = date.split('.');
    normItem.createdAt = new Date(`${year}-${month}-${day}`);
  }

  if (variants?.length) {
    normItem.variants = { create: variants };
  }

  return normItem;
});

for (const product of normalizedMenu) {
  await prisma.product.create({ data: product });
}

const productsCount = await prisma.product.count();
const variantsCount = await prisma.variant.count();

console.log(`Products: ${productsCount}, variants: ${variantsCount}`);

await prisma.$disconnect();
