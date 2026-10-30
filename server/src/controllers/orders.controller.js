// TODO: move locations to the database
import locations from '../data/locations.json' with { type: 'json' };
import crypto from 'node:crypto';
import prisma from '../db.js';
import { orderSchema } from '../schemas/order.schema.js';
import { ApiError } from '../utils/ApiError.js';

// TODO: temporary storage. Orders are lost after restart
const orders = [];

/**
 * POST /api/orders - create a new order.
 * The server checks all items and counts the total.
 */
export async function createOrder(req, res) {
  // Check that the request has the right fields and types
  const result = orderSchema.safeParse(req.body);

  if (!result.success) {
    throw ApiError.badRequest('Invalid order data', result.error.issues);
  }

  // Use only checked data
  const { customer, items: clientItems, locationId, comment } = result.data;

  // Check that the location exists
  const orderLocation = locations.find((loc) => loc.id === locationId);

  if (!orderLocation) {
    throw ApiError.badRequest(`Location ${locationId} not found`);
  }

  // Get all products with variants in one query
  const orderItems = [];
  const idsProducts = clientItems.map((item) => item.productId);
  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: idsProducts
      }
    },
    include: {
      variants: true
    }
  });

  let total = 0;

  for (const clientItem of clientItems) {
    // Find this item's product in the data from the database
    const serverProduct = dbProducts.find((product) => product.id === clientItem.productId);

    if (!serverProduct) {
      throw ApiError.badRequest(`Product ${clientItem.productId} not found`);
    }

    // Is this product sold in the chosen location?
    if (!orderLocation.availableProducts.includes(serverProduct.id)) {
      throw ApiError.badRequest(
        `Product "${serverProduct.name}" is not available in ${orderLocation.city}`,
      );
    }

    if (serverProduct.available === false) {
      throw ApiError.badRequest(`Product "${serverProduct.name}" is not available`);
    }

    // Tea and pastila need a selected variant
    const hasVariants = serverProduct.variants.length > 0;

    if (hasVariants && !clientItem.variantId) {
      throw ApiError.badRequest(`Variant is required for "${serverProduct.name}"`);
    }

    if (!hasVariants && clientItem.variantId) {
      throw ApiError.badRequest(`"${serverProduct.name}" has no variants`);
    }

    let variant = null;

    if (clientItem.variantId) {
      // Look only in this product's variants
      variant = serverProduct.variants.find((v) => v.id === clientItem.variantId);

      if (!variant) {
        throw ApiError.badRequest(
          `Variant ${clientItem.variantId} not found for "${serverProduct.name}"`,
        );
      }

      if (variant.available === false) {
        throw ApiError.badRequest(`Variant "${variant.name}" is not available`);
      }
    }

    // Use the variant price if it has one, otherwise the product price
    const price = variant?.price ?? serverProduct.price;

    const orderItem = {
      productId: clientItem.productId,
      name: serverProduct.name,
      price,
      variantId: variant?.id ?? null,
      variantName: variant?.name ?? null,
      quantity: clientItem.quantity,
    };

    // Save name and price now, so menu changes do not change old orders
    orderItems.push(orderItem);
    total += price * clientItem.quantity;
  }

  // The final order. Status 'new' until staff change it
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

/**
 * GET /api/orders - return all orders
 */
export function getOrders(_req, res) {
  return res.json(orders);
}
