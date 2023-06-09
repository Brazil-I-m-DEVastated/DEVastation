
import Clients from '../models/clients.js';
import generateToken from '../middlewares/auth/auth.js';
import { decryptCard, encryptCard } from '../security/dbsecurity.js';

class ClientsController {
    static listClients = async (req, res) => {
        try {
            const clients = await Clients.find();
            return res.status(200).send(clients);
        } 
        catch(error){
            return res.status(500).send({ message: error.message });            
        }
    };

    static listClientById = async (req, res) => {
        const { id } = req.params;
        const filter = ' name cpf email phoneNumber income address';

        try{
            const client = await Clients.findById(id).select(filter);
            if(!client){
                return res.status(404).send({ message: 'Client not found' });  
                
            }
            
            return res.status(200).send(client);
        }catch(error){
            return res.status(500).send( {message: error.message});
    
        }
    
        
    
    };

    static verifyCard = async (req, res) => {
        const cardValidate = req.body;

        const cardFilter = { 
            'card.name': encryptCard(cardValidate.name), 
            'card.number': encryptCard(cardValidate.number), 
            'card.expirationDate': encryptCard(cardValidate.expirationDate),
            'card.cvv': encryptCard(cardValidate.cvv)};
        try{
            const cardFound = await Clients.find(cardFilter);
            if(cardFound.length < 1 ){
                return res.status(404).send({ message: 'Card not found' });
            }
            const clientId = cardFound[0]._id;
            const income = cardFound[0].income;
            return res.status(200).json({clientId, income});
            
        }catch(error){
            return res.status(500).send( {message: error.message});
    
        }
    
    };

    static userLogin = async (req, res) => {
        try {
            const token = await generateToken(req.user);
            return res.set('Authorization', token).status(204).send();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    };
    

    static encryptCard = async (_req, res) => {
        try {
            
            const client = await Clients.find();

            console.log('Antes do for');
            for (let a = 0; a < client.length; a++) {
                console.log(`rodada ${a}`);
                client[a].card.name = encryptCard(client[a].card.name);
                client[a].card.cvv = encryptCard(client[a].card.cvv);
                client[a].card.number = encryptCard(client[a].card.number);
                client[a].card.expirationDate = encryptCard(client[a].card.expirationDate);
                
                await Clients.findByIdAndUpdate(client[a]._id, { $set: client[a] });
            }

            return res.status(200).send({client});
        } catch (err) {
            res.status(500).send({message: `${err.message} - falha ao criptografar clientes`});
        }
        

    };


}

export default ClientsController;
