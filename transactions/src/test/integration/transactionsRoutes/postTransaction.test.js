/* eslint-disable max-len */
import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import app from '../../../app.js';
import Transaction from '../../../model/Transaction.js';
import axios from 'axios';

describe('POST /transactions', () => {
    describe('Case it succeeds', () => {
        beforeEach(() => {
            jest.spyOn(Transaction.prototype, 'save').mockImplementation(() => Promise.resolve({}));
            axios.post = jest.fn(() => Promise.resolve({ 
                data: { 
                    clientId: '123',
                    income: 10000,
                }
            }));
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        it('should create a transaction with status code 201 and transaction status "Aprovada"', async () => {
            const response = await request(app)
                .post('/transactions')
                .set('Accept', 'application/json')
                .send({ cardInfo: 'card info aqui', transactionValue: 999 })
                .expect('content-type', /json/)
                .expect(201);
            
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('clientId');
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('transactionValue');
            expect(response.body.status).toBe('Aprovada');

        });
    });

    describe('Case the transaction needs an analysis', () => {
        beforeEach(() => {
            jest.spyOn(Transaction.prototype, 'save').mockImplementation(() => Promise.resolve({}));
            axios.post = jest.fn(() => Promise.resolve({ 
                data: { 
                    clientId: '123',
                    income: 10000,
                }
            }));
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        it('should create a transaction with status code 303 and transaction status "Em Análise', async () => {
            const response = await request(app)
                .post('/transactions')
                .set('Accept', 'application/json')
                .send({ cardInfo: 'card info aqui', transactionValue: 5001 })
                .expect('content-type', /json/)
                .expect(303);
            
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('clientId');
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('transactionValue');
            expect(response.body.status).toBe('Em Análise');
        });
    });

    describe('Case it fails', () => {
        beforeEach(() => {
            jest.spyOn(Transaction.prototype, 'save').mockImplementation(() => Promise.reject(new Error()));
            axios.post = jest.fn(() => Promise.resolve({ 
                data: { 
                    clientId: '123',
                    income: 10000,
                }
            }));
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        it('it should return an error message with status code 500', async () => {
            const response = await request(app)
                .post('/transactions')
                .set('Accept', 'application/json')
                .send({ cardInfo: 'card info aqui', transactionValue: 5001 })
                .expect('content-type', /json/)
                .expect(500);
            
            expect(response.body.message).toBe('Something went wrong');
        });
    });
});