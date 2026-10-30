import prisma from '../db.js';
import { ApiError } from '../utils/ApiError.js';

export async function getMenu(_req, res) {
  const menu = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  return res.json(menu);
}

export async function getById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw ApiError.badRequest('Invalid product id');
  }

  const foundProd = await prisma.product.findUnique({ where: { id } });

  if (!foundProd) {
    throw ApiError.notFound('Product not found');
  }

  return res.json(foundProd);
}
