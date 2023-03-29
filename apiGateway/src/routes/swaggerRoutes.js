import express from 'express';
import httpProxy from 'express-http-proxy';

const clientsUrl = `http://${process.env.CLIENTS_HOST}:${process.env.CLIENTS_PORT}`;

const fraudPreventionUrl = 
  `http://${process.env.FRAUDPREVENTION_HOST}:${process.env.FRAUDPREVENTION_PORT}`;

const transactionsUrl = 
  `http://${process.env.TRANSACTIONS_HOST}:${process.env.TRANSACTIONS_PORT}`;

const swaggerRouter = express.Router();

swaggerRouter    
    .get('/clients/docs', httpProxy(clientsUrl))
    .get('/fraudanalysis/docs', httpProxy(fraudPreventionUrl))
    .get('/transactions/docs', httpProxy(transactionsUrl));

export default swaggerRouter;