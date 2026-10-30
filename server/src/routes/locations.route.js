import express from 'express';
import { getLocations } from '../controllers/locations.controller.js';

// Routes for /api/locations (prefix is set in index.js)
const router = express.Router();

// GET /api/locations - all locations
router.get('/', getLocations);

export default router;
