
import Clients from '../models/clients.js';

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

        const cardFilter = { 'card.name': cardValidate.name, 'card.number': cardValidate.number, 
            'card.expirationDate': cardValidate.expirationDate,'card.cvc': cardValidate.cvc};
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
    

}

export default ClientsController;
