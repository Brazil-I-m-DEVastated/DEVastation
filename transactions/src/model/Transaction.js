import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        transactionValue: {
            type: mongoose.Types.Decimal128,
            required: true
        },

        clientId: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: ['Em Análise', 'Aprovada', 'Rejeitada']
        }
    },
    { versionKey: false }

);

const Transaction = mongoose.model('transactions', transactionSchema);
export default Transaction;