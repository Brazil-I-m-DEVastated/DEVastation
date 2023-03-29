import TRANSACTION_STATUS from '../constants/constants.js';

const generateLinks = (id, status) => {
    const PORT = process.env.TRANSACTION_PORT || 3003; 
    if (status === TRANSACTION_STATUS.EM_ANALISE)
    { 
        return [
            {
                rel: 'SELF',
                method: 'GET',
                href: `http://transactions:${PORT}/transactions/${id}`,
            },
            {
                rel: 'APPROVE',
                method: 'PATCH',
                href: `http://transactions:${PORT}/transactions/${id}`,
            },
            {
                rel: 'REJECT',
                method: 'PATCH',
                href: `http://transactions:${PORT}/transactions/${id}`,
            }, ];
    } else { 
        return [{
            rel: 'SELF',
            method: 'GET',
            href: `http://transactions:${PORT}/transactions/${id}`,
        }];
    }
};


export default generateLinks;