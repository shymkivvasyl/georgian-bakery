import express from 'express';

import { getById, getMenu } from '../controllers/menu.controller.js';

// Routes for /api/menu (prefix is set in index.js)
const router = express.Router();

// GET /api/menu - all products
router.get('/', getMenu);
// GET /api/menu/5 - one product
router.get('/:id', getById);

export default router;
