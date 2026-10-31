import prisma from '../db.js';

/**
 * GET /api/locations - return all locations
 */
export async function getLocations(_req, res) {
  const locations = await prisma.location.findMany({
    orderBy: { id: 'asc' },
    include: {
      products: {
        orderBy: { productId: 'asc' },
      },
    },
  });

  const locationsForClient = locations.map((location) => {
    const { products, ...locationData } = location;
    // The frontend needs a list of product ids, only products that are in stock here
    locationData.availableProducts = products
      .filter((product) => product.available)
      .map((product) => product.productId);

    return locationData;
  });

  return res.json(locationsForClient);
}
