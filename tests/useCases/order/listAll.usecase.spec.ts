import { describe, it, expect, vi, beforeEach } from 'vitest'
import Order from '../../../src/Entities/Order'
import { StatusEnum } from '../../../src/Entities/Enums/StatusEnum'
import ListAllOrdersUseCase from '../../../src/UseCases/Order/listAll/listAll.usecase'
import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import IOrderRepository from '../../../src/External/Database/Repositories/Contracts/IOrderRepository'

describe('ListAllOrdersUseCase', () => {
    let listAllOrdersUseCase: ListAllOrdersUseCase
    let mockOrderRepository: Partial<IOrderRepository>
    let mockOrder: Order

    beforeEach(() => {
        mockOrder = new Order('customer-id', 'order-id', StatusEnum.Received)
        mockOrder.toJSON = vi.fn().mockReturnValue({
            id: 'order-id',
            items: [
                {
                    id: 'item-id',
                    product: {
                        id: 'product-id',
                        name: 'Product Name',
                        category: 'Category',
                        price: 100,
                        description: 'Product description',
                    },
                    quantity: 2,
                },
            ],
            customer: 'customer-id',
            closed: false,
            status: StatusEnum.Received,
            createdAt: new Date(),
        })

        mockOrderRepository = {
            getAll: vi.fn(),
        }

        listAllOrdersUseCase = new ListAllOrdersUseCase(
            mockOrderRepository as IOrderRepository
        )
    })

    it('should return a list of all orders in DTO format', async () => {
        mockOrderRepository.getAll = vi
            .fn()
            .mockResolvedValue(Right([mockOrder]))
        const result = await listAllOrdersUseCase.execute()

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toHaveLength(1)
            expect(result.value[0]).toEqual(mockOrder.toJSON())
        }
        expect(mockOrder.toJSON).toHaveBeenCalled()
    })

    it('should return an error if fetching all orders fails', async () => {
        mockOrderRepository.getAll = vi
            .fn()
            .mockResolvedValue(Left<Error>(new Error('Orders not found')))

        const result = await listAllOrdersUseCase.execute()

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value.message).toBe('Orders not found')
        }
        expect(mockOrderRepository.getAll).toHaveBeenCalled()
    })
})
