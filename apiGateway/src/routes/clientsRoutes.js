import express from 'express';
import httpProxy from 'express-http-proxy';

const clientsUrl = `http://${process.env.CLIENTS_HOST}:${process.env.CLIENTS_PORT}`;

const clientsRouter = express.Router();

clientsRouter
    .get('/clients', httpProxy(clientsUrl))
    .get('/clients/:id', httpProxy(clientsUrl))
    .post('/clients/verifycard', httpProxy(clientsUrl));

export default clientsRouter;