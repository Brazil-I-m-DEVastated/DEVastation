import express from 'express';
import ClientsController from '../controllers/clientsController.js';


const router = express.Router();

router
    .get('/clients', ClientsController.listClients)
    .get('/clients/:id', ClientsController.listClientById)
    .post('/clients/verifycard', ClientsController.verifyCard);

export default router;