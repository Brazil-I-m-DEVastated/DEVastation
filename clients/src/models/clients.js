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
        cvv: { type: String, required: true },
      
    },
);

const clientSchema = new mongoose.Schema(
    {
        
        name: { type: String, required: true },
        cpf: { type: String, required: true },
        email: { type: String, required: true  },
        phoneNumber: { type: String, required: true },
        income: { type: Number, required: true },
        address: { type: addressSchema, required: true },
        card: { type: cardSchema , required: true },
    },
);


const Clients = mongoose.model('clientsInfo', clientSchema);

export default Clients;