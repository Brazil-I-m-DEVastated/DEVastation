import mongoose from 'mongoose';

const fraudSchema = new mongoose.Schema(
    {
        client_id: {
            type: String,
            required: true
        },
        transaction_id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Em Análise', 'Aprovada', 'Rejeitada'],
            default: 'Em Análise'
        }
    },
    { versionKey: false }
);

const fraudAnalysis = mongoose.model('fraudAnalysis', fraudSchema);

export default fraudAnalysis;
