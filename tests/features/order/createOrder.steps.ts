import { Given, When, Then } from '@cucumber/cucumber'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import assert from 'assert'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
const baseUrl = `http://localhost:${port}/api/kitchen`

let response: request.Response
let token: string
let order: any = {}

const jwtSecret = process.env.JWT_SECRET || ''

Given('que o cliente não se identifica', async () => {
    token = jwt.sign({ name: 'Test', type: 'UNREGISTERED' }, jwtSecret)
})

Given('que o cliente se identifica via CPF {string}', async (cpf: string) => {
    token = jwt.sign({ name: 'Test', user_name: 'Test', type: 'REGISTERED', cpf }, jwtSecret)
    order.cpf = cpf
})

When('o sistema cria um pedido na cozinha para o cliente {string} e itens', async (name: string, products: any[]) => {
    order.name = name
    order.products = products
    response = await request(baseUrl)
        .post('/order')
        .set({ 'token': token })
        .send(order)
})

Then('o pedido é criado com sucesso', () => {
    assert.equal(response.status, 200)
    console.log(response.body)
    assert(response.body.order.status,'Recebido')
})