import express from 'express';
import rateLimit from 'express-rate-limit';
import clientsRouter from './routes/clientsRoutes.js';
import transactionsRouter from './routes/transactionsRoutes.js';
import fraudPreventionRouter from './routes/fraudPreventionRoutes.js';
import { authBearer } from './middlewares/auth.js';
import apiGatewayRouter from './routes/apiGatewayRoutes.js';
import './middlewares/auth.js';

const app = express();

app.use(express.json());

// const limiter = rateLimit({ windowMs: 30 * 1000, max: 1, });

// app.use('/', limiter);

app.use('/', apiGatewayRouter);
app.use('/', authBearer, clientsRouter);
app.use('/', authBearer, transactionsRouter);
app.use('/', authBearer, fraudPreventionRouter);

export default app;