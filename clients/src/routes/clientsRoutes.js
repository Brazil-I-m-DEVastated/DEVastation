import express from 'express';
import ClientsController from '../controllers/clientsController.js';
// import '../security/estrategiaAutenticacao.js';
// import { localMiddlewareAut, bearerMiddlewareAut } from '../security/middlewareAutenticacaoUser.js';

const router = express.Router();

router
    .get('/clients', ClientsController.listClients)
    .get('/clients/:id', ClientsController.listClientById)
    .get('/clientVerifyCard', ClientsController.verifyCard);
//   .get('/api/client/:idClient/card/:idCard', ClientsController.getIncomeByIdCardAndIdClient);
//   .post('/api/admin/accounts', AccountsController.inserirAccount)
//   .put('/api/admin/accounts/:id', AccountsController.atualizarAccount)
//   .delete('/api/admin/accounts/:id', AccountsController.excluirAccount)
//   .post('/api/accounts/login', AccountsController.logarAccount);

export default router;