import mongoose from 'mongoose';
import TRANSACTION_STATUS from '../constants/constants.js';

const transactionSchema = new mongoose.Schema(
    {
        transactionValue: {
            type: Number,
            required: true
        },

        clientId: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: [
                TRANSACTION_STATUS.EM_ANALISE, 
                TRANSACTION_STATUS.APROVADA, 
                TRANSACTION_STATUS.REJEITADA
            ]
        }
    },
    { versionKey: false }
);

const Transaction = mongoose.model('transactions', transactionSchema);
export default Transaction;