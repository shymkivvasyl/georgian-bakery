// Move product images from Google Drive to Cloudinary.
// Safe to run many times: it only takes images still on Drive
import 'dotenv/config';
import prisma from '../src/db.js';
import { uploadImage } from '../src/services/storage.js';
import fs from 'node:fs/promises';
import menu from '../src/data/menu.json' with { type: 'json' };

const menuImages = await prisma.product.findMany({
  where: { imageUrl: { contains: 'drive.google.com' } },
});

let uploaded = 0;
let errors = 0;
const newUrls = new Map();

// One by one, so we don't hit the request limits
for (const item of menuImages) {
  // try/catch inside the loop: one bad image does not stop the others
  try {
    const imageUrl = await uploadImage(item.imageUrl, {
      folder: 'georgian-bakery/menu',
      publicId: `product-${item.id}`,
    });

    newUrls.set(item.id, imageUrl);

    await prisma.product.update({ where: { id: item.id }, data: { imageUrl } });

    uploaded++;
    console.log(`Updated image for product ${item.name}`);
  } catch (error) {
    errors++;
    console.error(`Error updating image for product ${item.name}:`, error.message);
  }
}

for (const product of menu) {
  if (newUrls.has(product.id)) {
    product.imageUrl = newUrls.get(product.id);
  }
}

await fs.writeFile('src/data/menu.json', JSON.stringify(menu, null, 2) + '\n');

console.log(`Successfully uploaded images: ${uploaded}`);
console.log(`Errors occurred: ${errors}`);

await prisma.$disconnect();
