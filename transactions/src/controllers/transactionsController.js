import Transaction from '../model/Transaction.js';
import { verifyClient, openFraudAnalysis } from '../helpers/fetchAPI.js';
import TRANSACTION_STATUS from '../constants/constants.js';
import generateLinks from '../helpers/links.js';

class TransactionController {
    static getById = async (req, res) => {
        const { id } = req.params;
        const transactionById = await Transaction.findById(id);

        return res.status(200).json(transactionById);
        
    };

    static create = async (req, res) => {
        const { cardInfo, transactionValue } = req.body;
        
        const { clientId, income } = await verifyClient(cardInfo);
        
        const transaction = {
            clientId,
            transactionValue,
        };

        if (transactionValue > (income/2)) {

            const transactionInAnalysis = new Transaction({ ...transaction, 
                status: TRANSACTION_STATUS.EM_ANALISE });
            
            await transactionInAnalysis.save();

            openFraudAnalysis(clientId, transactionInAnalysis._id);

            const response = {
                id: transactionInAnalysis._id,
                status: transactionInAnalysis.status,
                links: generateLinks(
                    transactionInAnalysis._id,
                    transactionInAnalysis.status
                )
            };
            
            return res.status(303).json(response);
        } else {
            const transactionApproved = new Transaction({ ...transaction, 
                status: TRANSACTION_STATUS.APROVADA });
            
            await transactionApproved.save();

            const response = {
                id: transactionApproved._id,
                status: transactionApproved.status,
                links: generateLinks(
                    transactionApproved._id,
                    transactionApproved.status
                )
            };
            return res.status(201).json(response);
        }}; 

    static updateStatus = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        const transaction = await Transaction.findById(id);

        if ( transaction.status === TRANSACTION_STATUS.EM_ANALISE ) {

            const updatedTransaction = await Transaction
                .findByIdAndUpdate(id, { status }, { new: true });

            return res.status(200).json(updatedTransaction);
           
        } else { 
            throw new Error('422|"transaction" status must be a valid one');
        }
    };
}

export default TransactionController;