import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import menuRouter from './src/routes/menu.route.js';
import locationsRouter from './src/routes/locations.route.js';
import ordersRouter from './src/routes/orders.route.js';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/menu', menuRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/orders', ordersRouter)

app.listen(PORT, () => {
   console.log(`Server: http://localhost:${PORT} running`);
});
 