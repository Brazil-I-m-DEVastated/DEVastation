import express from 'express';
import { errorHandler } from '../src/middlewares/index.js';
import transactionsRoutes from '../src/routes/transactionsRoutes.js';
import db from '../src/db/config/mongodb-connection.js';

db.on('error', console.log.bind(console, 'Erro de Conexão'));
db.once('open', () => {
    console.log('conexão feita com sucesso');
});

const app = express();
app.use(express.json());
app.use(transactionsRoutes);
app.use(errorHandler);


export default app; 