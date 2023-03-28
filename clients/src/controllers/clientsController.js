// import bcrypt from 'bcryptjs';
import Clients from '../models/clients.js';
// import createToken from '../security/token.js';

// function gerarSenhaHash(senha) {
//     const custoHash = 12;
//     return bcrypt.hash(senha, custoHash);
// }

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

    // static inserirAccount = async (req, res) => {
    //     const account = new accounts(req.body);
    //     const senhaUser = await gerarSenhaHash(req.body.senhaHash);
    //     account.senhaHash = senhaUser;
    //     account.save((err) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: `${err.message} - falha ao cadastrar um usuario`,
    //             });
    //         } else {
    //             res.status(201).send(account.toJSON());
    //         }
    //     });
    // };
    // // foi inserido uma Usuário

    static listClientById = async (req, res) => {
        const { id } = req.params;
        const filter = ' name cpf email phoneNumber income address';

        try{
            const client = await Clients.findById(id).select(filter);
            if(!client){
                return res.status(404).send({ message: 'Client not found' });  
                
            }
            // const {card:_, ...clientFiltrado} = client.dataValues;
            return res.status(200).send(client);
        }catch(error){
            return res.status(500).send( {message: error.message});
    
        }
    
        
    //busquei by id
    };

    static verifyCard = async (req, res) => {
        const cardValidate = req.body;

        const cardFilter = { 'card.name': cardValidate.name, 'card.number': cardValidate.number, 
            'card.expirationDate': cardValidate.expirationDate,'card.cvc': cardValidate.cvc};
        try{
            const cardFound = await Clients.find(cardFilter);
            if(cardFound === '[]'){
                return res.status(404).send({ message: 'Card not found' });
            }
            console.log(cardFound);
            const idClient = cardFound[0]._id;
            const income = cardFound[0].income;
            const idCard = cardFound[0].card._id;
            return res.status(200).json({idClient, income, idCard});
            // const {card:_, ...clientFiltrado} = client.dataValues;
            
        }catch(error){
            return res.status(500).send( {message: error.message});
    
        }
    
    };
    
    // static verifyCard = async (req, res) => {
    //     try {
    //         const info = req.body;
    //         const client = await Clients.card.findOne({cvc: info.cvc})
            
    //         if (client.card.cvc.includes(info.cvc) && client.card.number.includes(info.number) 
    //         && client.card.expirationDate.includes(info.expirationDate)) {
    //             return res.status(200).send({message: `${client.id}` })
    //         }
    //     } catch (error) {
    //         return res.status(400).send({message: `${message.error}`})
    //     }
    // };

    // static getIncomeByIdCardAndIdClient = async (req, res) => {
    //     try {
    //         const idCard = req.params.idCard
    //         const idClient = req.params.idClient;
    //         console.log(idCard);
    //         const client = await Clients.findById(idClient);
    //         console.log(client.card[0]);
    //         //const cardX = client.card;
    //         //return res.status(200).json({ message: `${cardX.Income}` });
    //         return res.status(200);
    //     } catch (error) {
    //         return res.status(500).send({ message: error.message });
    //     }
    // };

    // static atualizarAccount = (req, res) => {
    //     const { id } = req.params;

    //     accounts.findByIdAndUpdate(id, { $set: req.body }, (err) => {
    //         if (err) {
    //             res.status(500).send({ message: err.message });
    //         } else {
    //             res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    //         }
    //     });
    // };

    // static excluirAccount = (req, res) => {
    //     const { id } = req.params;

    //     accounts.findByIdAndDelete(id, (err) => {
    //         if (err) {
    //             res.status(500).send({ message: err.message });
    //             // se colocar 204 a mensagem não aparece
    //         } else {
    //             res.status(200).send({ message: 'Usuário removido com sucesso' });
    //         }
    //     });
    // };
    // // atualizou um Accounts

    // static logarAccount = (req, res) => {
    //     const token = createToken(req.user);
    //     res.set('Authorization', token);
    //     res.status(204).send();
    // };
}

export default ClientsController;

// utilizado para criar "funções" que realizarão as funções, como buscar, excluir e etc