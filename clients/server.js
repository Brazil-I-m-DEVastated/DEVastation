import app from './src/app.js';
import db from './src/config/dbConnect.js';
import dotenv from 'dotenv';

dotenv.config();
// se tirar o .js n funciona

const PORT = process.env.CLIENTS_PORT || 3000;
db.on('error', console.log.bind(console, 'Erro de conexão com o banco de dados'));
db.once('open', () => {
    console.log('conexão com o banco de dados feita com sucesso');
});

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});

// aqui que coloca o servidor online