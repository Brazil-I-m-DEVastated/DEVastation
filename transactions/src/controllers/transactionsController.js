import Transaction from '../model/Transaction.js';
import { verifyClient, openFraudAnalysis } from '../helpers/fetchAPI.js';

class TransactionController {
    static getById = async (req, res) => {
        const { id } = req.params;
        const transactionById = await Transaction.findById(id);

        return res.status(200).json(transactionById);
        
    };

    static create = async (req, res) => {
        const { cardInfo, transactionValue } = req.body;
        
        const { clientId, income } = verifyClient(cardInfo);
        
        const transaction = {
            clientId,
            transactionValue,
        };

        if (transactionValue > (income/2)) {

            const transactionInAnalysis = new Transaction({ ...transaction, status: 'Em Análise'});
            
            await transactionInAnalysis.save();

            openFraudAnalysis(clientId, transactionInAnalysis._id);
            
            return res.status(303).json(transactionInAnalysis);
        } else {
            const transactionApproved = new Transaction({ ...transaction, status: 'Aprovada'});
            
            await transactionApproved.save();

            return res.status(201).json(transactionApproved);
        }

    };

    static updateStatus = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        const transaction = await Transaction.findById(id);

        if ( transaction.status === 'Em Análise') {

            const updatedTransaction = await Transaction
                .findByIdAndUpdate(id, { status }, { new: true });

            return res.status(200).json(updatedTransaction);
           
        } else { 
            throw new Error('422|"transaction" status must be a valid one');
        }
    };
}

export default TransactionController;