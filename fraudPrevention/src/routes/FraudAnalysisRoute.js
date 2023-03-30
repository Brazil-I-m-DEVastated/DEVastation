import express from 'express';
import FraudAnalysisController from '../controller/FraudAnalysisController.js';
import passport from 'passport';
import { authBearer } from '../middlewares/auth/auth.js';
import '../middlewares/auth/auth.js';

import 'express-async-errors';

const router = express.Router();

router
    .post('/fraudanalysis', authBearer, FraudAnalysisController.createFraudAnalysis)
    .get('/fraudanalysis', FraudAnalysisController.getAllAwaiting)
    .get('/fraudanalysis/:id', FraudAnalysisController.getById)
    .patch('/fraudanalysis/:id', FraudAnalysisController.updateFraudAnalysis)
    .post('/fraudanalysis/login', 
        passport.authenticate('local', { session: false }), 
        FraudAnalysisController.userLogin);

export default router;
