import mongoose from "mongoose";

mongoose.connect("mongodb://admin:secret@127.0.0.1:27017/db-mongo?authSource=admin");
// confirmar se é numero ou mongo
let db = mongoose.connection;

export default db;

