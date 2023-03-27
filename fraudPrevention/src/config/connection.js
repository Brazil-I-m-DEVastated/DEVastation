import mongoose from 'mongoose';

const DB_HOST = process.env.NODE_ENV === 'test' ? '127.0.0.1' : process.env.DB_HOST;

const URL = `//admin:secret@${DB_HOST}:27017/ecomm-account?authSource=admin`;

mongoose.connect(URL);

let db = mongoose.connection;

export default db;