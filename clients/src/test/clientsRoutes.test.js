import request from 'supertest';
import app from '../app.js';
import db from '../config/dbConnect.js';

beforeAll(async () => {
    db.once('open', () => {});
});

afterAll(async () => {
    await db.close();
});

let id;
let datasCard;
describe('GET em /clients', () => {
    it('Deve retornar todas os clientes', async () => {
        const response = await request(app)
            .get('/clients')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
        id = response.body[0]._id;
        datasCard= response.body[0].card;
    });
});


describe('GET em /clients/id', () => {
    it('Deve retornar apenas um cliente', async () => {
        await request(app)
            .get(`/clients/${id}`)
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});

describe('POST em /clients/verifycard', () => {
    it('Deve retornar um id de cliente que teve um cartão válido', async () => {
        await request(app)
            .post('/clients/verifycard')
            .send(datasCard)
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});
