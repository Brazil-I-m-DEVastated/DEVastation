import express from 'express';
import FraudAnalysisController from '../controller/FraudAnalysisController.js';

const router = express.Router();

router
    .post('/fraudanalysis', FraudAnalysisController.createFraudAnalysis)
    .get('/fraudanalysis', FraudAnalysisController.getAllAwaiting)
    .get('/fraudanalysis/:id', FraudAnalysisController.getById)
    .patch('/fraudanalysis/:id', FraudAnalysisController.updateFraudAnalysis);

export default router;
