import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';

const URL = 
`mongodb://admin:secret@${DB_HOST}:${DB_PORT}/DEVastation-users?authSource=admin`;

mongoose.connect(URL);

let db = mongoose.connection;

export default db;