// Move product images from Google Drive to Cloudinary.
// Safe to run many times: it only takes images still on Drive
import 'dotenv/config';
import prisma from '../src/db.js';
import { uploadImage } from '../src/services/storage.js';

const menuImages = await prisma.product.findMany({
  where: { imageUrl: { contains: 'drive.google.com' } },
});

let uploaded = 0;
let errors = 0;

// One by one, so we don't hit the request limits
for (const item of menuImages) {
  // try/catch inside the loop: one bad image does not stop the others
  try {
    const imageUrl = await uploadImage(item.imageUrl, 'georgian-bakery/menu');

    await prisma.product.update({ where: { id: item.id }, data: { imageUrl } });

    uploaded++;
    console.log(`Updated image for product ${item.name}`);
  } catch (error) {
    errors++;
    console.error(`Error updating image for product ${item.name}:`, error.message);
  }
}

console.log(`Successfully uploaded images: ${uploaded}`);
console.log(`Errors occurred: ${errors}`);

// Close the database connection
await prisma.$disconnect();
