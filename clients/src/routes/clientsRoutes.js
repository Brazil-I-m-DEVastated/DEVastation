import express from 'express';
import ClientsController from '../controllers/clientsController.js';
import passport from 'passport';
import { authBearer } from '../middlewares/auth/auth.js';
import '../middlewares/auth/auth.js';


const router = express.Router();

router
    .get('/clients', authBearer, ClientsController.listClients)
    .get('/clients/:id', authBearer, ClientsController.listClientById)
    .post('/clients/verifycard', authBearer, ClientsController.verifyCard)
    .post('/clients/login', 
        passport.authenticate('local', { session: false }), 
        ClientsController.userLogin);

export default router;