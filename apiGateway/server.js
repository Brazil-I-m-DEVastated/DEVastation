import db from './src/config/connection.js';
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.GATEWAY_PORT;

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => {
    console.log('API Gateway DB Connected Successfully!');
});

app.listen(port,() => {console.log(`API Gateway running! Port ${port}`);});