// Load variables from .env into process.env (must be first)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Routes (which URL goes to which controller)
import menuRouter from './src/routes/menu.route.js';
import locationsRouter from './src/routes/locations.route.js';
import ordersRouter from './src/routes/orders.route.js';
// Database client
import prisma from './src/db.js';
import { errorMiddleware } from './src/middlewares/error.middleware.js';

// Port from .env, or 5000 if it is not set
const PORT = process.env.PORT || 5000;

// Create the Express app
const app = express();

// Read JSON from the request body into req.body
app.use(express.json());
// Allow the frontend (another port/domain) to read our responses
app.use(cors());

// Connect routes with their URL prefix
app.use('/api/menu', menuRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/orders', ordersRouter);

// Handle all errors in one place. Must be after all routes
app.use(errorMiddleware);

// Check the database connection on start
const count = await prisma.product.count();
console.log(`Total products in the database: ${count}`);

// Start the server. If it can't start (e.g. port is busy), show the error and stop
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server: http://localhost:${PORT} running`);
});
