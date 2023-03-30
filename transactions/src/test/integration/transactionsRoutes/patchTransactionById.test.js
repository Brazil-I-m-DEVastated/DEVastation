import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import app from '../../../app.js';
import Transaction from '../../../model/Transaction.js';

describe('PATCH /transactions/:id', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            Transaction.findById = jest.fn().mockResolvedValue({ status: 'Em Análise' });
            Transaction.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({ status: 'Rejeitada'});
            Transaction.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({ status: 'Aprovada'});
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        it('should update a transaction with status "Em Análise" to "Aprovada"', async () => {
            const response = await request(app)
                .patch('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                .set('Accept', 'application/json')
                .send({ status: 'Aprovada'})
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual({ status: 'Aprovada'});
        });

        it('should update a transaction with status "Em Análise" to "Rejeitada"', async () => {
            const response = await request(app)
                .patch('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                .set('Accept', 'application/json')
                .send({ status: 'Rejeitada'})
                .expect('content-type', /json/)
                .expect(200);
            
            expect(response.body).toStrictEqual({ status: 'Aprovada'});
        });
    });

    describe('Case it fails', () => {

        describe('When the given Id is not found', () => {
            beforeEach(() => {
                Transaction.findById = jest.fn().mockRejectedValue(new Error());
            });
        
            afterEach(() => {
                jest.clearAllMocks();
            });
    
            it('should return an error message with status 500', async () => {
                const response = await request(app)
                    .patch('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                    .set('Accept', 'application/json')
                    .send({ status: 'Rejeitada'})
                    .expect('content-type', /json/)
                    .expect(500);
                
                expect(response.body.message).toBe('Something went wrong');
            });
        });

        describe('When the transaction status is already set to "Aprovada"', () => {
            beforeEach(() => {
                Transaction.findById = jest.fn().mockResolvedValue({ status: 'Aprovada' });
            });
        
            afterEach(() => {
                jest.clearAllMocks();
            });
    
            it('should return an error message with status 422', async () => {
                const response = await request(app)
                    .patch('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                    .set('Accept', 'application/json')
                    .send({ status: 'Rejeitada'})
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"transaction" status must be a valid one');
            });
        });

        describe('When the transaction status is already set to "Rejeitada"', () => {
            beforeEach(() => {
                Transaction.findById = jest.fn().mockResolvedValue({ status: 'Rejeitada' });
            });
        
            afterEach(() => {
                jest.clearAllMocks();
            });
    
            it('should return an error message with status 422', async () => {
                const response = await request(app)
                    .patch('/transactions/63c9c9cfc0c3ad8ecc9157e7')
                    .set('Accept', 'application/json')
                    .send({ status: 'Rejeitada'})
                    .expect('content-type', /json/)
                    .expect(422);
                
                expect(response.body.message).toBe('"transaction" status must be a valid one');
            });
        });

    });
});