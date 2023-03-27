import mongoose from 'mongoose';

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
            enum: ['EM ANÁLISE', 'APROVADA', 'REJEITADA']
        }
    }

);

const Transaction = mongoose.model('transactions', transactionSchema);
export default Transaction;