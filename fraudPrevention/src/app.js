import express from 'express';
import swaggerUi from 'swagger-ui-express';
import db from './config/connection.js';
import routes from './routes/index.js';

// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);

// const swaggerDoc = require('../swagger/fraudPrevention.json');

db.on('error', console.log.bind(console, 'error de conexão'));
db.once('open', () => {
    console.log('Conexão aberta');
});

const app = express();

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());

routes(app);

export default app;