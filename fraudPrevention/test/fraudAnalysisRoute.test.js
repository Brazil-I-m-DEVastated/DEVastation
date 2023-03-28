// import axios from 'axios';
import request from 'supertest';
import { jest, describe, it, expect, afterAll } from '@jest/globals';
import app from '../src/app.js';
import mongoose from 'mongoose';

// jest.unstable_mockModule('axios', () => ({
//     patch: jest.fn(() => {}),
// }));

afterAll((done) => {
    mongoose.connection.close();
    done();
});

let idResponse;
describe('POST in /fraudanalysis', () => {
    it('Should create a new Fraud Analysis', async () => {
        const response = await request(app)
            .post('/fraudanalysis')
            .send({
                client_id: 'abc123',
                transaction_id: 'abc123',
            })
            .expect(201);
        
        idResponse = response.body._id;
        expect(response.body.client_id).toEqual('abc123');
    });
});

describe('GET in /fraudanalysis', () => {
    it('Should retrieve all Fraud Analysis with "Awaiting" status', async () => {
        const response = await request(app)
            .get('/fraudanalysis')
            .set('Accept', 'application/json')
            .expect(200);
        
        expect(response.body[0].client_id).toEqual('abc123');
    });
});

describe('GET by ID in /fraudanalysis/:id', () => {
    it('Must return a Fraud Analysis according to its ID', async () => {
        const response = await request(app)
            .get(`/fraudanalysis/${idResponse}`)
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
        
        expect(response.body.client_id).toEqual('abc123');
    });
});

// describe('PATCH in /fraudanalysis/:id', () => {
//     it('Must update a Fraud Analysis', async () => {
//         // axios.patch.mockResolvedValueOnce({test: true});
//         const response = await request(app)
//             .patch(`/fraudanalysis/${idResponse}`)
//             .send({
//                 status: 'Aprovada'
//             });
//             // .expect(200);
            
      
//         expect(response.body.status).toEqual('Aprovada');
//     });
// });

describe('POST in /fraudanalysis', () => {
    it('Should create a new Fraud Analysis', async () => {
        await request(app)
            .post('/fraudanalysis')
            .send({
                client_id: 'abc123',
            })
            .expect(500);
    });
});

// describe('GET in /fraudanalysis', () => {
//     it("Shouldn't retrieve all Fraud Analysis with 'Awaiting' status", async () => {
//         const response = await request(app)
//             .get('/fraudanalysis')
//             .set('Accept', 'application/json')
//             .expect(500);
//     });
// });
// tentar mockar isso aqui

describe('GET by ID in /fraudanalysis/:id', () => {
    it('Must NOT return a Fraud Analysis according to its ID', async () => {
        await request(app)
            .get('/fraudanalysis/123')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(500);
    });
});

describe('PATCH in /fraudanalysis/:id', () => {
    it('Must NOT update a Fraud Analysis', async () => {
        await request(app)
            .patch(`/fraudanalysis/${idResponse}`)
            .send({
                status: 'Rejeitada'
            })
            .expect(400);
    });
});