import mongoose from 'mongoose';

mongoose.set('runValidators', true);

mongoose.connect('mongodb://admin:secret@${DB_HOST}:27017/devastation-transactions?authSource=admin');

const db = mongoose.connection;

export default db;