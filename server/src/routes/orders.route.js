import express from 'express';
import { createOrder, getOrders } from '../controllers/orders.controller.js';

// Routes for /api/orders (prefix is set in index.js)
const router = express.Router();

// GET /api/orders - all orders
router.get('/', getOrders);
// POST /api/orders - create an order
router.post('/', createOrder);

export default router;
