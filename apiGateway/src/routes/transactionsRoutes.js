import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const transactionsUrl = 
  `http://${process.env.TRANSACTIONS_HOST}:${process.env.TRANSACTIONS_PORT}`;

const transactionsRouter = express.Router();

transactionsRouter
    .get('/transactions/:id', createProxyMiddleware({ target: transactionsUrl}))
    .post('/transactions', createProxyMiddleware({ target: transactionsUrl}))
    .patch('/transactions/:id', createProxyMiddleware({ target: transactionsUrl}));

export default transactionsRouter;