import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';
import { errorHandler } from '../src/middlewares/index.js';
import transactionsRoutes from '../src/routes/transactionsRoutes.js';
import db from '../src/db/config/mongodb-connection.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger/transactions.json');


db.on('error', console.log.bind(console, 'Erro de conexão'));

db.once('open', () => {
    console.log('Conexão feita com sucesso');
});

const app = express();
app.use(express.json());

app.use('/transactions/docs', swaggerUi.serve)
    .get('/transactions/docs', swaggerUi.setup(swaggerDocument));

app.use(transactionsRoutes);
app.use(errorHandler);


export default app; 