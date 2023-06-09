import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
    consumerName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
