import express from 'express';
import rateLimit from 'express-rate-limit';
import clientsRouter from './routes/clientsRoutes.js';
import transactionsRouter from './routes/transactionsRoutes.js';
import fraudPreventionRouter from './routes/fraudPreventionRoutes.js';

const app = express();

app.use(express.json());

const limiter = rateLimit({ windowMs: 30 * 1000, max: 1, });

app.use('/', limiter);

app.use('/', clientsRouter);
app.use('/', transactionsRouter);
app.use('/', fraudPreventionRouter);


export default app;