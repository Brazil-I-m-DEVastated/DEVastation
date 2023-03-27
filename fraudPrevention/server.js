import * as dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.FRAUDPREVENTION_PORT;

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});
