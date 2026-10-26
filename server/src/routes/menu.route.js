import express from 'express';

import { getById, getMenu } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getById);

export default router;