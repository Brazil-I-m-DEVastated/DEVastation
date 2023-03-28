import request from 'supertest';
import app from '../app.js';
import db from '../config/dbConnect.js';

beforeAll(async () => {
    db.once('open', () => {});
});

afterAll(async () => {
    await db.close();
});

describe('GET em /clients', () => {
    it('Deve retornar todas os clientes', async () => {
        await request(app)
            .get('/clients')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});
describe('GET em /clients/id', () => {
    it('Deve retornar apenas um cliente', async () => {
        await request(app)
            .get('/clients/6422df5f09b29a1283b786e3')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});

describe('GET em /clientsVerifyCard', () => {
    it('Deve retornar um id de cliente que teve um cartão válido', async () => {
        await request(app)
            .get('/clientVerifyCard')
            .send({
                number: "rua tal 1",
                name: "10",
                expirationDate: "alameda tal",
                cvc: "765"
            })
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});
// let idResposta;
// describe('POST em /api/admin/categories', () => {
//     it('Deve criar uma categoria', async () => {
//         const resposta = await request(app)
//             .post('/api/admin/categories')
//             .send({
//                 NOME: 'ANIMACAOTESTE',
//                 STATUS: 'ATIVA',
//             })
//             .expect('content-type', /json/)
//             .expect(201);
//         idResposta = resposta.body._id;
//     });
// });

// describe('GET em /api/categories/:id', () => {
//     it('Deve retornar uma categoria especifica', async () => {
//         await request(app)
//             .get(`/api/categories/${idResposta}`)
//             .expect(200);
//     // colocar o status correto é extremamente importante
//     });
// });

// describe('PATCH em /api/categories/:id', () => {
//     it('Deve ATIVAR uma categoria especifica', async () => {
//         await request(app)
//             .patch(`/api/admin/categories/${idResposta}`)
//             .expect(200);
//     // colocar o status correto é extremamente importante
//     });
// });

// describe('put em /api/categories/:id', () => {
//     it('Deve atualizar uma categoria especifica', async () => {
//         await request(app)
//             .put(`/api/admin/categories/${idResposta}`)
//             .send({
//                 NOME: 'ANIMACAOTESTE',
//             })
//             .expect(200);
//     // colocar o status correto é extremamente importante
//     });
// });

// describe('DELETE em /api/admin/categories/:id', () => {
//     it('Deve apagar uma categoria', async () => {
//         await request(app)
//             .delete(`/api/admin/categories/${idResposta}`)
//             .expect(200);
//     // colocar o status correto é extremamente importante
//     });
// });