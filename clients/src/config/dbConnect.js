import mongoose from "mongoose";

mongoose.connect("mongodb://admin:secret@mongo:27017/clients?authSource=admin");
// confirmar se é numero ou mongo
let db = mongoose.connection;

export default db;

