import { createCipheriv, createDecipheriv} from 'crypto';

const CHAVENV = 'bd8db53fcc2b8f74400e5366be34b11561485af56dfd7576543698d22917adc4';
const VIENV = '30481b581eb237cbf1296c74285e87aa';

function  encryptCard(cardInfo){
    const cifra = createCipheriv('aes256', Buffer.from(CHAVENV, 'hex'), Buffer.from(VIENV, 'hex'));
    return cifra.update(cardInfo, 'utf-8', 'hex') + cifra.final('hex');
}

function decryptCard(encryptInfo){
    const decifra = createDecipheriv('aes256', Buffer.from(CHAVENV, 'hex'), Buffer.from(VIENV, 'hex'));
    return decifra.update(encryptInfo, 'hex', 'utf-8') + decifra.final('utf-8');
}

export {decryptCard, encryptCard};