import express from 'express';
import ClientsController from '../controllers/clientsController.js';
// import '../security/estrategiaAutenticacao.js';
// import { localMiddlewareAut, bearerMiddlewareAut } from '../security/middlewareAutenticacaoUser.js';

const router = express.Router();

router
    .get('/api/clients', ClientsController.listClients);
//   .get('/api/accounts/:id', AccountsController.listarAccountPorId)
//   .post('/api/admin/accounts', AccountsController.inserirAccount)
//   .put('/api/admin/accounts/:id', AccountsController.atualizarAccount)
//   .delete('/api/admin/accounts/:id', AccountsController.excluirAccount)
//   .post('/api/accounts/login', AccountsController.logarAccount);

export default router;