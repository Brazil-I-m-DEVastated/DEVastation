import Transaction from '../model/Transaction.js';
import { fetchVerifyCardAndGetClientId, fetchClientIncome } from '../helpers/fetchAPI.js';

class TransactionController {
    static getById = async (req, res) => {
        const { id } = req.params;
        const transactionById = await Transaction.findById(id);

        return res.status(200).json(transactionById);
        
    };

    static create = async (req, res) => {
        let transactionStatus = '';
        const { cardInfo, transactionValue } = req.body;
        
        const { clientId, cardId } = fetchVerifyCardAndGetClientId(cardInfo);
        const clientIncome = fetchClientIncome(clientId, cardId);

        if (transactionValue > (clientIncome/2)) {
            transactionStatus = 'Em Análise';
        } else {
            transactionStatus = 'Aprovada';
        }

        const transaction = {
            clientId,
            transactionValue,
            status: transactionStatus,
        };
        
        const newTransaction = new Transaction(transaction);
        
        await newTransaction.save();
        
        return res.status(201).json(newTransaction);
    };

    static updateStatus = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        const transaction = await Transaction.findById(id);
        console.log(status);
        console.log(transaction.status);


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