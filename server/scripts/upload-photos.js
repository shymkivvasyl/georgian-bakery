import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import prisma from '../src/db.js';
import { uploadImage } from '../src/services/storage.js';

const PHOTOS_DIR = path.join(import.meta.dirname, '../import/photos');
const MENU_PATH = path.join(import.meta.dirname, '../src/data/menu.json');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// One photo for many products.
// Key = file name (without extension), value = product names
const SHARED_PHOTOS = {
  'Palmira чай': ['Чорний чай', 'Зелений чай', "Трав'яний і фруктовий чай"],
};

// Make names easy to compare: same letters, case and apostrophes
function normalize(text) {
  return (
    text
      // On Mac "й" can be saved as two symbols, NFC makes it one
      .normalize('NFC')
      .trim()
      .toLowerCase()
      .replace(/['’ʼ`]/g, "'")
  );
}

// Shared photos with normalized names: file -> [product names]
const sharedPhotos = new Map(
  Object.entries(SHARED_PHOTOS).map(([file, names]) => [normalize(file), names.map(normalize)]),
);

// Only image files (skip folders like raw, done, extra)
const entries = await fs.readdir(PHOTOS_DIR, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => IMAGE_EXTENSIONS.includes(path.extname(name).toLowerCase()));

// All products with one query (not one query per photo)
const products = await prisma.product.findMany({ select: { id: true, name: true } });
// Normalized name -> product
const productsByName = new Map(products.map((product) => [normalize(product.name), product]));

const newUrls = new Map(); // product id -> new image link
const notFound = [];
let uploaded = 0;
let errors = 0;

// One by one, so we don't hit Cloudinary limits
for (const file of files) {
  const name = normalize(path.parse(file).name);

  const productNames = sharedPhotos.get(name) ?? [name];
  const targets = productNames
    .map((productName) => productsByName.get(productName))
    .filter(Boolean);

  if (targets.length === 0) {
    notFound.push(file);
    continue;
  }

  if (targets.length < productNames.length) {
    console.warn(`! ${file}: some products from SHARED_PHOTOS were not found`);
  }

  try {
    const imageUrl = await uploadImage(path.join(PHOTOS_DIR, file), {
      publicId: `product-${targets[0].id}`,
    });

    for (const product of targets) {
      await prisma.product.update({ where: { id: product.id }, data: { imageUrl } });
      newUrls.set(product.id, imageUrl);
    }

    uploaded++;
    console.log(`✔ ${file} -> ${targets.map((product) => product.name).join(', ')}`);
  } catch (error) {
    errors++;
    console.error(`✖ ${file}: ${error.message}`);
  }
}

// Save new links in menu.json too, so the seed keeps them
const menu = JSON.parse(await fs.readFile(MENU_PATH, 'utf8'));
for (const product of menu) {
  if (newUrls.has(product.id)) {
    product.imageUrl = newUrls.get(product.id);
  }
}
await fs.writeFile(MENU_PATH, JSON.stringify(menu, null, 2) + '\n');

console.log(`\nUploaded photos: ${uploaded}, products updated: ${newUrls.size}, errors: ${errors}`);
if (notFound.length > 0) {
  console.log(`No product found for: ${notFound.join(', ')}`);
}

await prisma.$disconnect();
