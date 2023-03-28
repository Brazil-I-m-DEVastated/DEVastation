import mongoose from 'mongoose';

mongoose.set('runValidators', true);

const DB_HOST = process.env.DB_HOST || 'mongo';
const DB_PORT = process.env.DB_PORT || '27017';

mongoose.connect(
    `mongodb://admin:secret@${DB_HOST}:${DB_PORT}/devastation-transactions?authSource=admin`
);


const db = mongoose.connection;

export default db;