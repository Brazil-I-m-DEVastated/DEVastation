import mongoose from 'mongoose';
import ANALYSIS_STATUS from '../constants/constants.js';

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
            enum: [ANALYSIS_STATUS.EM_ANALISE, ANALYSIS_STATUS.APROVADA, ANALYSIS_STATUS.REJEITADA],
            default: ANALYSIS_STATUS.EM_ANALISE
        }
    },
    { versionKey: false }
);

const fraudAnalysis = mongoose.model('fraudAnalysis', fraudSchema);

export default fraudAnalysis;
