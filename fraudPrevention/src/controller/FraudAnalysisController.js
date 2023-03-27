import fraudAnalysis from '../model/FraudAnalysisModel.js';

class FraudAnalysisController {
    static getAllAwaiting = async (_req, res) => {
        try {
            const result = await fraudAnalysis.find({ status: 'Em Análise'});
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    static getById = async (req, res) => {
        const { id } = req.params;
        console.log(id);

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
            const checkStatus = await fraudAnalysis.findById(id);
            if(checkStatus.status === 'Aprovada' || checkStatus.status === 'Rejeitada') {
                return res.status(400).send({ message: 'Fraud Analysis Status cannot be updated' });
            }
            await fraudAnalysis.findByIdAndUpdate(id, status);
            return res.status(204).end();
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };
}

export default FraudAnalysisController;
