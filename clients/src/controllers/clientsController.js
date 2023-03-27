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

    // static listClientById = (req, res) => {
    //     const { id } = req.params;
    //     Clients.findById(id, (err, category) => {
    //         if (err) {
    //             res.status(404).send({
    //                 message: `${err.message} - Id de usuário não localizado.`,
    //             });
    //         } else {
    //             res.status(200).send(category);
    //         }
    //     }).select('name cpf');

    // busquei by id
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