import { createCipheriv, createDecipheriv} from 'crypto';

const CHAVENV = process.env.KEY_CRYPTO;
const VIENV = process.env.VI_CRYPTO;

function  encryptCard(cardInfo){
    const cifra = createCipheriv('aes256', Buffer.from(CHAVENV, 'hex'), Buffer.from(VIENV, 'hex'));
    return cifra.update(cardInfo, 'utf-8', 'hex') + cifra.final('hex');
}

function decryptCard(encryptInfo){
    const decifra = createDecipheriv('aes256', Buffer.from(CHAVENV, 'hex'), Buffer.from(VIENV, 'hex'));
    return decifra.update(encryptInfo, 'hex', 'utf-8') + decifra.final('utf-8');
}

export {decryptCard, encryptCard};