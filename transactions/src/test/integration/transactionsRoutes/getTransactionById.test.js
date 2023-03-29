import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import app from '../../../app.js';
import Transaction from '../../../model/Transaction.js';

describe('GET /transactions/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            Transaction.findById = jest.fn().mockResolvedValue('teste');
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        // afterAll((done) => { mongoose.connection.close(); done(); });
        
        it('should return an specified transaction with status 200', async () => {
            const response = await request(app)
                .get('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toEqual('teste');
        });
    });

    describe('Case it does not find the specified account', () => {
        beforeEach(() => {
            Transaction.findById = jest.fn().mockRejectedValue(new Error());
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return an error message with status 500', async () => {
            const response = await request(app)
                .get('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                .set('Accept', 'application/json')
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});