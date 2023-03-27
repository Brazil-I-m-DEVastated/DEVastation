import mongoose from "mongoose";

const DB_HOST = process.env.DB_HOST || 'localhost'; 
const DB_PORT = process.env.DB_PORT || '27017';

const mongoURL =  `mongodb://admin:secret@${DB_HOST}:${DB_PORT}/clients?authSource=admin`;
mongoose.connect(mongoURL);


// confirmar se é numero ou mongo
let db = mongoose.connection;

export default db;

