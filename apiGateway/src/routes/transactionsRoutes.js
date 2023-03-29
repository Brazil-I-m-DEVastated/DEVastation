import express from 'express';
import httpProxy from 'express-http-proxy';

const transactionsUrl = 
  `http://${process.env.TRANSACTIONS_HOST}:${process.env.TRANSACTIONS_PORT}`;

const transactionsRouter = express.Router();

transactionsRouter
    .get('/transactions/:id', httpProxy(transactionsUrl))
    .post('/transactions', httpProxy(transactionsUrl))
    .patch('/transactions/:id', httpProxy(transactionsUrl));

export default transactionsRouter;