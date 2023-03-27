import mongoose from 'mongoose';


const addressSchema = new mongoose.Schema(
    {
        street: { type: String, required: true },
        complement: { type: String, required: true },
        number: { type: String, required: true },
        cep: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        
    },
);

const cardSchema = new mongoose.Schema(
    {
        number: { type: String, required: true },
        name: { type: String, required: true },
        expirationDate: { type: String, required: true },
        cvc: { type: String, required: true },
      
    },
);

const clientSchema = new mongoose.Schema(
    {
        _id: false,
        name: { type: String, required: true },
        cpf: { type: String, required: true },
        email: { type: String, required: true  },
        phoneNumber: { type: String, required: true },
        income: { type: Number, required: true }, // ALTERAR PARA UM TIPO MAIS CORRETO (DINHEIRO)
        address: { type: cardSchema, required: true },
        card: { type: addressSchema, required: true },
    },
);


const Clients = mongoose.model('clientsInfo', clientSchema);

export default Clients;