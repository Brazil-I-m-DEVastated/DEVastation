import Transaction from '../model/Transaction.js';

class TransactionController {
    static getById = (req, res, next) => {
        const { id } = req.params;
        Transaction.findOne({ id }, (err, transaction) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json(transaction);
            }
        });
    };
}

export default TransactionController;