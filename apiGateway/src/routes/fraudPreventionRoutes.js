import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const fraudPreventionUrl = 
  `http://${process.env.FRAUDPREVENTION_HOST}:${process.env.FRAUDPREVENTION_PORT}`;
console.log(fraudPreventionUrl);

const fraudPreventionRouter = express.Router();

fraudPreventionRouter
    .get('/fraudanalysis', createProxyMiddleware({ target: fraudPreventionUrl, changeOrigin: true}))
    .get('/fraudanalysis/:id', createProxyMiddleware(
        { 
            target: fraudPreventionUrl, 
            changeOrigin: true
        }))
    .post('/fraudanalysis', createProxyMiddleware(
        { 
            target: fraudPreventionUrl, 
            changeOrigin: true
        }))
    .patch('/fraudanalysis/:id', createProxyMiddleware({ target: fraudPreventionUrl}));

export default fraudPreventionRouter;