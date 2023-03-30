import express from 'express';
import TransactionController from '../controllers/transactionsController.js';
import passport from 'passport';
import { authBearer } from '../middlewares/auth/auth.js';
import '../middlewares/auth/auth.js';


import 'express-async-errors';

const router = express.Router();

router
    .get('/transactions/:id', authBearer, TransactionController.getById)
    .post('/transactions', authBearer, TransactionController.create)
    .patch('/transactions/:id', authBearer, TransactionController.updateStatus)
    .post('/transactions/login', 
        passport.authenticate('local', { session: false }), 
        TransactionController.userLogin);

export default router;