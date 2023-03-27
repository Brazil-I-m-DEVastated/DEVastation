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

    static create = (req, res, next) => {
        const transaction = new Transaction(req.body);
        transaction.save((err) => {
            if (err) {
                next(err);
            } else {
                res.status(201).json(transaction);
            }
        });
    };

    static updateStatus = (req, res, next) => {
        const { status } = req.body;
        const { id } = req.params;
        const transactionById = Transaction.findOne({ id }, (err, transaction) => {
            if(err) {
                next(err);
            } else {
                return transaction;
            }
        });

        if ( transactionById.status === 'EM ANÁLISE') {
            Transaction.findOneAndUpdate({ id }, {$set: { status }}, (err, transaction) => {
                if (err) {
                    next(err);
                } else {
                    res.status(200).json(transaction);
                }
            });
        }
    };
}

export default TransactionController;