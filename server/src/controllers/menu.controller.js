import prisma from '../db.js';


export async function getMenu(req, res) {
  const menu = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  return res.json(menu);
}

export async function getById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  const foundProd = await prisma.product.findUnique({ where: { id }})

  if (!foundProd) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(foundProd)
}
