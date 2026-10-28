/* eslint-disable no-unused-vars */
import 'dotenv/config';
import prisma from '../src/db.js';
import menu from '../src/data/menu.json' with { type: 'json' };

await prisma.$executeRaw`TRUNCATE "Product" RESTART IDENTITY`;

const normalizedMenu = menu.map((item) => {
  const { id, ingredients, variants, date, ...normItem } = item;
  normItem.imageUrl ||= null;

  if (date) {
    const [day, month, year] = date.split('.');
    normItem.createdAt = new Date(`${year}-${month}-${day}`);
  }

  return normItem;
});

await prisma.product.createMany({ data: normalizedMenu });

const data = await prisma.product.findMany();
const count = await prisma.product.count();

console.log(`Total products in the database: ${count}`);

await prisma.$disconnect();
