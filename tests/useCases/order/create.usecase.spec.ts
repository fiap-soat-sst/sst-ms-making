import { describe, it, beforeEach, expect, vi } from 'vitest'
import CreateOrderUseCase from '../../../src/UseCases/Order/create/create.usecase'
import { Right, isRight } from '../../../src/@Shared/Either'
import { InputCreateOrderDTO } from '../../../src/UseCases/Order/create/create.dto'
import IOrderRepository from '../../../src/External/Database/Repositories/Contracts/IOrderRepository'

describe('CreateOrderUseCase', () => {
    let createOrderUseCase: CreateOrderUseCase
    let mockOrderRepository: Partial<IOrderRepository>

    beforeEach(() => {
        mockOrderRepository = {
            create: vi.fn().mockResolvedValue(Right('order-id')),
        }

        createOrderUseCase = new CreateOrderUseCase(
            mockOrderRepository as IOrderRepository
        )
    })

    it('should create an order successfully', async () => {
        const input: InputCreateOrderDTO = {
            name: 'John Doe',
            cpf: '40418376000',
            products: [{ id: 'valid-product-id', quantity: 2 }],
        }

        const result = await createOrderUseCase.execute(input)

        expect(isRight(result)).toBe(true)

        if (isRight(result)) {
            expect(result.value).toBe('order-id')
        }
        expect(mockOrderRepository.create).toHaveBeenCalled()
    })

    it('should create an order for a new customer without CPF', async () => {
        const orderCustomer: InputCreateOrderDTO = {
            name: 'John Doe',
            cpf: '',
            products: [{ id: 'valid-product-id', quantity: 2 }],
        }

        const result = await createOrderUseCase.execute(orderCustomer)

        expect(result).toEqual(Right('order-id'))
        expect(mockOrderRepository.create).toHaveBeenCalled()
    })
})
