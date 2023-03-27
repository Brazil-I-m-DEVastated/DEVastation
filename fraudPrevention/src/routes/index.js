import express from 'express';
import fraudAnalysis from '.FraudAnalysisRoute.js';

const routes = (app) => {
    app.use(express.json(), fraudAnalysis);
};

export default routes;
