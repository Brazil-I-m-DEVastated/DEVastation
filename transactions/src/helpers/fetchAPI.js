import axios from 'axios';

const verifyClient = async(cardInfo) => {
    try {
        const response = await axios.post('/clientVerifyCard', cardInfo);
        console.log(response);

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const openFraudAnalysis = async (client_id, transaction_id) => {
    try {
        await axios.post('/fraudanalysis', { client_id, transaction_id });
    } catch (error) {
        throw new Error(error.message);
    }
};

export { verifyClient, openFraudAnalysis };