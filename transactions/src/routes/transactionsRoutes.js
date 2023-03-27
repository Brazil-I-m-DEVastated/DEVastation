import express from 'express';
import TransactionController from '../controllers/transactionsController.js';

import 'express-async-errors';

const router = express.Router();

router
    .get('/transactions/:id', TransactionController.getById)
    .post('/transactions', TransactionController.create)
    .patch('/transactions/:id', TransactionController.updateStatus);

export default router;