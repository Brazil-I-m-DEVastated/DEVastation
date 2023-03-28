import express from 'express';
import clients from './clientsRoutes.js';

const routes = (app) => {
    app.route('/').get((_req, res) => {
        res.status(200).send({ titulo: 'API do Projeto final' });
    });

    app.use(
        express.json(),
        clients,
    );
};

export default routes;