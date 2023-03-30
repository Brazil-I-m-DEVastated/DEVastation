import express from 'express';
import httpProxy from 'express-http-proxy';

const fraudPreventionUrl = 
  `http://${process.env.FRAUDPREVENTION_HOST}:${process.env.FRAUDPREVENTION_PORT}`;

const fraudPreventionRouter = express.Router();

fraudPreventionRouter
    .post('/fraudanalysis', httpProxy(fraudPreventionUrl))
    .get('/fraudanalysis', httpProxy(fraudPreventionUrl))
    .get('/fraudanalysis/:id', httpProxy(fraudPreventionUrl))
    .patch('/fraudanalysis/:id', httpProxy(fraudPreventionUrl));

export default fraudPreventionRouter;