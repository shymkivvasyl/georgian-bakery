/* eslint-disable no-unused-vars */
// Run: npx prisma db seed
import 'dotenv/config';
import prisma from '../src/db.js';
import menu from '../src/data/menu.json' with { type: 'json' };
import locations from '../src/data/locations.json' with { type: 'json' };

// Delete all rows and reset ids to 1, so the seed can run many times
await prisma.$executeRaw`TRUNCATE "Product", "Variant", "Location", "LocationProduct" RESTART IDENTITY CASCADE`;

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

// All product ids that exist in the database
const products = await prisma.product.findMany({ select: { id: true } })
const productIds = new Set(products.map((product) => product.id));

// Create locations after products,
// because LocationProduct needs the products to exist
for (const location of locations) {
  // Take out fields that are not in the Location model
  const { id, availableProducts, ...locationData } = location;

  // Remove duplicates and ids of products that do not exist
  const validIds = [...new Set(availableProducts)].filter((productId) => productIds.has(productId));

  if (validIds.length !== availableProducts.length) {
    console.warn(`${location.city}: skipped invalid product ids`);
  }

  await prisma.location.create({
    data: {
      ...locationData,
      // Connect products to this location:
      // [1, 12] -> [{ productId: 1 }, { productId: 12 }]
      products: {
        create: validIds.map(productId => ({ productId })),
      }
    }
  })
}

const productsCount = await prisma.product.count();
const variantsCount = await prisma.variant.count();
const locationsCount = await prisma.location.count();
const linksCount = await prisma.locationProduct.count();

console.log(`Products: ${productsCount}, variants: ${variantsCount}, locations: ${locationsCount}, locationProduct: ${linksCount}`);

// Close the database connection
await prisma.$disconnect();
