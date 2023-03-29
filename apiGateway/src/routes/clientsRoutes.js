import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const clientsUrl = `http://${process.env.CLIENTS_HOST}:${process.env.CLIENTS_PORT}`;

const clientsRouter = express.Router();

const clientsProxy = createProxyMiddleware({ target: clientsUrl });

clientsRouter
    .get('/clients', clientsProxy)
    .get('/clients/:id', clientsProxy)
    .post('/clients/verifycard', clientsProxy);

export default clientsRouter;