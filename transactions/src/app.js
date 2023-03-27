import express from 'express';
import { errorHandler } from '../src/middlewares/index.js';
import transactionsRoutes from '../src/routes/transactionsRoutes.js';

const app = express();
app.use(express.json());
app.use(transactionsRoutes);
app.use(errorHandler);


export default app; 