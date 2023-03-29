import express from 'express';
import ApiGatewayController from '../controllers/apiGatewayController.js';
import passport from 'passport';

const apiGatewayRouter = express.Router();

apiGatewayRouter
    .post('/login', 
        passport.authenticate('local', { session: false }), 
        ApiGatewayController.userLogin);

export default apiGatewayRouter;