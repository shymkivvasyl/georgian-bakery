import products from '../data/menu.json' with { type: 'json' };


export function getMenu(req, res) {
  return res.json(products)
}