import express from 'express';
import routes from './routes/index.js';
import './middlewares/auth/auth.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger/clients.json');
const app = express();

app.use(express.json());
app.use('/clients/docs', swaggerUi.serve)
    .get('/clients/docs', swaggerUi.setup(swaggerDocument));
routes(app);

export default app;