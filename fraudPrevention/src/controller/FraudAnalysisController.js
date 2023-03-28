import fraudAnalysis from '../model/FraudAnalysisModel.js';
import ANALYSIS_STATUS from '../constants/constants.js';
import updateTransactionStatus from '../helper/fetchTransactions.js';

class FraudAnalysisController {
    static getAllAwaiting = async (_req, res) => {
        try {
            const result = await fraudAnalysis.find({ status: ANALYSIS_STATUS.EM_ANALISE});
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    static getById = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await fraudAnalysis.findById(id);
            if(!result) {
                return res.status(404).send({ message: 'Fraud Analysis Not Found'});
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    static createFraudAnalysis = async (req, res) => {
        const fraudInfo = req.body;

        try {
            const newAnalysis = new fraudAnalysis(fraudInfo);
            const result = await newAnalysis.save();
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    static updateFraudAnalysis = async (req, res) => {
        const { status } = req.body;
        const { id } = req.params;

        try {
            const analysis = await fraudAnalysis.findById(id);
            if( !analysis ) {
                return res.status(404).send({ message: 'Fraud Analysis ID not found'});
            }
            if ( analysis.status === ANALYSIS_STATUS.APROVADA
                || analysis.status === ANALYSIS_STATUS.REJEITADA )
            {
                return res.status(400).send({ message: 'Fraud Analysis Status cannot be updated' });
            }
            await fraudAnalysis.findByIdAndUpdate(id, {status});
            await updateTransactionStatus(analysis.transaction_id, status);
            return res.status(204).end();
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };
}

export default FraudAnalysisController;
