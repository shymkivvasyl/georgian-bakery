import locations from '../data/locations.json' with { type: 'json' };
import crypto from 'node:crypto';
import prisma from '../db.js';
import { orderSchema } from '../schemas/order.schema.js';

const orders = [];

export async function createOrder(req, res) {
  const result = orderSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Invalid order data', errors: result.error.issues });
  }

  const { customer, items: clientItems, locationId, comment } = result.data;
  const orderLocation = locations.find((loc) => loc.id === locationId);

  if (!orderLocation) {
    return res.status(400).json({ message: `Location ${locationId} not found` });
  }

  let total = 0;
  const orderItems = [];
  const idsProducts = clientItems.map((item) => item.productId);
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
