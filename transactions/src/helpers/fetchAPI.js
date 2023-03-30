import axios from 'axios';

const CLIENTS_HOST = process.env.CLIENTS_HOST || 'localhost';
const CLIENTS_PORT = process.env.CLIENTS_PORT || 3001;
const FRAUDPREVENTION_HOST = process.env.FRAUDPREVENTION_HOST || 'localhost';
const FRAUDPREVENTION_PORT = process.env.FRAUDPREVENTION_PORT || 3002;
const CLIENTS_BASE_URL = `http://${CLIENTS_HOST}:${CLIENTS_PORT}/clients`;
const FRAUDPREVENTION_BASE_URL = 
    `http://${FRAUDPREVENTION_HOST}:${FRAUDPREVENTION_PORT}/fraudanalysis`;

const verifyClient = async(cardInfo) => {
    try {
        const token = await authenticateConsumer(CLIENTS_BASE_URL, 'client', 'aloha');
        const url = `${CLIENTS_BASE_URL}/verifycard`;
        const response = await axios.post(url, cardInfo, { headers: {
            Authorization: `Bearer ${token}`
        }});

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const openFraudAnalysis = async (client_id, transaction_id) => {
    try {
        const token = await authenticateConsumer(FRAUDPREVENTION_BASE_URL, 'client', 'aloha');
        const url = `http://${FRAUDPREVENTION_HOST}:${FRAUDPREVENTION_PORT}/fraudanalysis`;
        await axios.post(url, { client_id, transaction_id }, { headers: {
            Authorization: `Bearer ${token}`
        }});
    } catch (error) {
        throw new Error(error.message);
    }
};

const authenticateConsumer = async (baseUrl, consumerName, password) => {
    const url = `${baseUrl}/login`;
    const data = { consumerName, password };
    const response = await axios.post(url, data);
    return response.headers.getAuthorization();
};

export { verifyClient, openFraudAnalysis };