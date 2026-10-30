/* eslint-disable no-unused-vars */
// Fill an empty database with start data from menu.json
// Run: npx prisma db seed
import 'dotenv/config';
import prisma from '../src/db.js';
import menu from '../src/data/menu.json' with { type: 'json' };

// Delete all rows and reset ids to 1, so the seed can run many times
await prisma.$executeRaw`TRUNCATE "Product", "Variant" RESTART IDENTITY CASCADE`;

// Change JSON data to the shape of the Product model
const normalizedMenu = menu.map((item) => {
  // Take out fields that are not in the model (or need changes)
  const { id, ingredients, variants, date, ...normItem } = item;
  // Empty string -> null (no image)
  normItem.imageUrl ||= null;

  // Date in JSON is DD.MM.YYYY, but JS needs YYYY-MM-DD
  if (date) {
    const [day, month, year] = date.split('.');
    normItem.createdAt = new Date(`${year}-${month}-${day}`);
  }

  // Create the variants together with the product
  if (variants?.length) {
    normItem.variants = { create: variants };
  }

  return normItem;
});

// One by one with create, because createMany can't create variants
for (const product of normalizedMenu) {
  await prisma.product.create({ data: product });
}

const productsCount = await prisma.product.count();
const variantsCount = await prisma.variant.count();

console.log(`Products: ${productsCount}, variants: ${variantsCount}`);

// Close the database connection
await prisma.$disconnect();
