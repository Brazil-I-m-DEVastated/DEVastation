import axios from 'axios';

const fetchVerifyCardAndGetClientId = async(cardInfo) => {
    try {
        const response = await axios.post('/clientVerifyCard', cardInfo);
        console.log(response);

        return response;
    } catch (error) {
        throw new Error(error.message); //?
    }
};

const fetchClientIncome = async (clientId, cardId) => {
    try {
        const response = await axios.get(`/client/${clientId}/card/${cardId}`);
        console.log(response);
    
        return response;
    } catch (error) {
        throw new Error(error.message); //?
    }
};

export { fetchVerifyCardAndGetClientId, fetchClientIncome };