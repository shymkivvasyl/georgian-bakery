import products from '../data/menu.json' with { type: 'json' };

export function getMenu(req, res) {
  return res.json(products);
}

export function getById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Bad id product' });
  }

  const foundProd = products.find(item => item.id === id)

  if (!foundProd) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(foundProd)
}
