import prisma from '../db.js';
import { orderSchema } from '../schemas/order.schema.js';
import { ApiError } from '../utils/ApiError.js';


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
  const { customer, items: clientItems, locationId, comment } = result.data;

  const orderLocation = await prisma.location.findUnique({
    where: { id: locationId },
    include: {
      products: true,
    }
  })


  if (!orderLocation) {
    throw ApiError.badRequest(`Location ${locationId} not found`);
  }

  // Get all products with variants in one query
  const orderItems = [];
  const idsProducts = clientItems.map((item) => item.productId);
  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: idsProducts,
      },
    },
    include: {
      variants: true,
    },
  });
  // Ids of products that are in stock in this location
  const availableIds = new Set(
    orderLocation.products.filter(product => product.available).map(product => product.productId)
  )

  let total = 0;

  for (const clientItem of clientItems) {
    const serverProduct = dbProducts.find((product) => product.id === clientItem.productId);

    if (!serverProduct) {
      throw ApiError.badRequest(`Product ${clientItem.productId} not found`);
    }

    // Is this product sold in the chosen location?
    if (!availableIds.has(serverProduct.id)) {
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
  const { name, phone } = customer;
  // Order data for the database. id, status and date are set by the database
  const orderData = {
    customerName: name,
    phone,
    locationId,
    orderItems: { create: orderItems },
    total,
    comment,
  };

  // Create the order and its items in one query
  const createdOrder = await prisma.order.create({ data: orderData, include: { orderItems: true } })

  return res.status(201).json(createdOrder);
}

/**
 * GET /api/orders - return all orders
 */
export async function getOrders(_req, res) {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { orderItems: { orderBy: { id: 'asc' } } } })


  return res.json(orders);
}
