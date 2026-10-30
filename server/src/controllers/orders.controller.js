import locations from '../data/locations.json' with { type: 'json' };
import crypto from 'node:crypto';
import prisma from '../db.js';
import { orderSchema } from '../schemas/order.schema.js';
import { ApiError } from '../utils/ApiError.js';

const orders = [];

export async function createOrder(req, res) {
  const result = orderSchema.safeParse(req.body);

  if (!result.success) {
    throw ApiError.badRequest('Invalid order data', result.error.issues )
  }

  const { customer, items: clientItems, locationId, comment } = result.data;
  
  const orderLocation = locations.find((loc) => loc.id === locationId);

  if (!orderLocation) {
    throw ApiError.badRequest(`Location ${locationId} not found`);
  }

  let total = 0;
  const orderItems = [];
  const idsProducts = clientItems.map((item) => item.productId);
  const dbProducts = await prisma.product.findMany({ where: { id: { in: idsProducts } } });

  for (const clientItem of clientItems) {
    const serverProduct = dbProducts.find((product) => product.id === clientItem.productId);

    if (!serverProduct) {
      throw ApiError.badRequest(`Product ${clientItem.productId} not found`);
    }

    if (!orderLocation.availableProducts.includes(serverProduct.id)) {
      throw ApiError.badRequest(`Product "${serverProduct.name}" is not available in ${orderLocation.city}`)
    }

    if (serverProduct.available === false) {
      throw ApiError.badRequest(`Product "${serverProduct.name}" is not available`);
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


export function getOrders(_req, res) {
  return res.json(orders);
}
