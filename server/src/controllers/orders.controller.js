import locations from '../data/locations.json' with { type: 'json' };
import crypto from 'node:crypto';
import prisma from '../db.js';

const orders = [];

export async function createOrder(req, res) {
  const { customer, items: clientItems, locationId, comment } = req.body;
  const orderLocation = locations.find((loc) => loc.id === locationId);



  if (!locationId) {
    return res.status(400).json({ message: 'Location is required' });
  }

  if (!orderLocation) {
    return res.status(400).json({ message: `Location ${locationId} not found` });
  }

  let total = 0;

  const orderItems = [];

  if (!customer || !customer.name || !customer.phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  if (!Array.isArray(clientItems) || clientItems.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }
  
  const invalidItem = clientItems.find((item) => !Number.isInteger(item.productId));

  if (invalidItem) {
    return res.status(400).json({ message: `Product id ${invalidItem.productId} is not valid` });
  }

  const idsProducts = clientItems.map((item) => item.productId)

  const dbProducts = await prisma.product.findMany({ where: { id: { in: idsProducts } } });

  for (const clientItem of clientItems) {
    const serverProduct = dbProducts.find((product) => product.id === clientItem.productId);

    if (!serverProduct) {
      return res.status(400).json({ message: `Product ${clientItem.productId} not found` });
    }

    if (!orderLocation.availableProducts.includes(serverProduct.id)) {
      return res.status(400).json({
        message: `Product "${serverProduct.name}" is not available in ${orderLocation.city}`,
      });
    }

    if (serverProduct.available === false) {
      return res.status(400).json({ message: `Product "${serverProduct.name}" is not available` });
    }

    if (!Number.isInteger(clientItem.quantity) || clientItem.quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    const orderItem = {
      productId: clientItem.productId,
      name: serverProduct.name,
      price: serverProduct.price,
      quantity: clientItem.quantity,
    };

    orderItems.push(orderItem);

    total += serverProduct.price * clientItem.quantity;
  }

  const order = {
    id: crypto.randomUUID(),
    customer,
    locationId,
    items: orderItems,
    total,
    comment,
    status: 'new',
    createdAt: new Date(),
  };

  orders.push(order);

  return res.status(201).json(order);
}

export function getOrders(req, res) {
  return res.json(orders);
}
