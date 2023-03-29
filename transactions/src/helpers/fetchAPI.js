import axios from 'axios';

const CLIENTS_HOST = process.env.CLIENTS_HOST || 'localhost';
const CLIENTS_PORT = process.env.CLIENTS_PORT || 3001;
const FRAUDPREVENTION_HOST = process.env.FRAUDPREVENTION_HOST || 'localhost';
const FRAUDPREVENTION_PORT = process.env.FRAUDPREVENTION_PORT || 3002;

const verifyClient = async(cardInfo) => {
    try {
        const url = `http://${CLIENTS_HOST}:${CLIENTS_PORT}/clients/verifycard`;
        const response = await axios.post(url, cardInfo);

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const openFraudAnalysis = async (client_id, transaction_id) => {
    try {
        const url = `http://${FRAUDPREVENTION_HOST}:${FRAUDPREVENTION_PORT}/fraudanalysis`;
        await axios.post(url, { client_id, transaction_id });
    } catch (error) {
        throw new Error(error.message);
    }
};

export { verifyClient, openFraudAnalysis };