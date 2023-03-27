import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});