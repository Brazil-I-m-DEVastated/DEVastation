import app from './src/app.js';
import db from './src/config/dbConnect.js';
// se tirar o .js n funciona

const PORT = process.env.PORT || 3001;

db.on('error', console.log.bind(console, 'Erro de conexão com o banco de dados'));
db.once('open', () => {
    console.log('conexão com o banco de dados feita com sucesso');
});

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});

// aqui que coloca o servidor online