import axios from 'axios';

const TRANSACTIONS_HOST = process.env.TRANSACTIONS_HOST || 'localhost';
const TRANSACTIONS_PORT = process.env.TRANSACTIONS_PORT || 3002;
const TRANSACTIONS_BASE_URL = `http://${TRANSACTIONS_HOST}:${TRANSACTIONS_PORT}/transactions`;

const updateTransactionStatus = async (transactionId, status) => {
    const url = `${TRANSACTIONS_BASE_URL}/${transactionId}`;
    const data = { status };
    const response = await axios.patch(url, data);
    if(response.status !== 200){
        throw new Error('Transaction could not be updated');
    }
    return true;
};

export default updateTransactionStatus;