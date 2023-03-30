import axios from 'axios';

const TRANSACTIONS_HOST = process.env.TRANSACTIONS_HOST || 'localhost';
const TRANSACTIONS_PORT = process.env.TRANSACTIONS_PORT || 3002;
const TRANSACTIONS_BASE_URL = `http://${TRANSACTIONS_HOST}:${TRANSACTIONS_PORT}/transactions`;
const LOGIN = 'fraud';
const PASSWORD = 'aloha';

const updateTransactionStatus = async (transactionId, status) => {
    const token = await authenticateConsumer(LOGIN, PASSWORD);
    const url = `${TRANSACTIONS_BASE_URL}/${transactionId}`;
    const data = { status };
    const response = await axios.patch(url, data, { headers: {
        Authorization: `Bearer ${token}`
    }});
    if(response.status !== 200){
        throw new Error('422|Transaction could not be updated');
    }
    return true;
};

const authenticateConsumer = async (consumerName, password) => {
    const url = `${TRANSACTIONS_BASE_URL}/login`;
    const data = { consumerName, password };
    const response = await axios.post(url, data);
    return response.headers.getAuthorization();
};

export default updateTransactionStatus;