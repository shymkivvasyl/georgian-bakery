import prisma from '../db.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * GET /api/menu - return all products with their variants
 */
export async function getMenu(_req, res) {
  const menu = await prisma.product.findMany({
    // Always set the order. Without it the database can return rows in any order
    orderBy: { id: 'asc' },
    // Also get the variants of each product (one query, not one per product)
    include: {
      variants: {
        orderBy: { id: 'asc' },
      },
    },
  });

  return res.json(menu);
}

/**
 * GET /api/menu/:id - return one product with its variants
 */
export async function getById(req, res) {
  // URL params are always strings, so convert to a number
  const id = Number(req.params.id);

  // 400: the id itself is wrong (e.g. "abc")
  if (!Number.isInteger(id)) {
    throw ApiError.badRequest('Invalid product id');
  }

  const foundProd = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: { orderBy: { id: 'asc' } },
    },
  });

  // 404: the id is fine, but there is no such product
  if (!foundProd) {
    throw ApiError.notFound('Product not found');
  }

  return res.json(foundProd);
}
