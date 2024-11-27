import request from 'supertest'
import { StatusEnum } from '../../src/Entities/Enums/StatusEnum'
import { describe, it, expect } from 'vitest'
import app from '../../src/External/Api/App'

describe('Create Order', () => {
    it('should create an order successfully', async () => {
        const response = await request(app)
            .post('/kitchen/order')
            .send({
                nameCustomer: 'John Doe',
                cpf: '40418376000',
                products: [
                    {
                        name: 'Hamburguer Classic',
                        category: 'Sandwich',
                        description: 'tasty',
                        quantity: 2,
                    },
                ],
            })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe(StatusEnum.Received)
    })

    it('should return 400 if no products are provided', async () => {
        const response = await request(app).post('/kitchen/order').send({
            name: 'John Doe',
            cpf: '123456789',
            products: [],
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Order without products')
    })
})
