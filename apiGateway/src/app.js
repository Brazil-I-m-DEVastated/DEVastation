import express from 'express';
import clientsRouter from './routes/clientsRoutes.js';

const app = express();

app.use(express.json());

app.use('/', clientsRouter);

export default app;