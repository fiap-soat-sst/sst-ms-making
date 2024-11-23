import { describe, it, beforeEach, expect, vi } from 'vitest'
import CreateOrderUseCase from '../../../src/UseCases/Order/create/create.usecase'
import { Left, Right, isRight } from '../../../src/@Shared/Either'
import { ICookingAreaGatewayRepository } from '../../../src/Gateways/contracts/ICookingAreaGatewayRepository'
import { InputCreateOrderDTO } from '../../../src/UseCases/Order/create/create.dto'
import { CategoryEnum } from '../../../src/Entities/Enums/CategoryEnum'

describe('CreateOrderUseCase', () => {
    let createOrderUseCase: CreateOrderUseCase
    let mockOrderRepository: Partial<ICookingAreaGatewayRepository>

    beforeEach(() => {
        mockOrderRepository = {
            create: vi.fn().mockResolvedValue(Right('order-id')),
        }

        mockCustomerRepository = {
            findByCpf: vi
                .fn()
                .mockResolvedValue(
                    Right(
                        new Customer(
                            'John Doe',
                            '40418376000',
                            'teste@email.com'
                        )
                    )
                ),
        }

        mockProductRepository = {
            findById: vi.fn().mockImplementation((id: string) => {
                if (id === 'valid-product-id') {
                    const mockProduct = new Product(
                        id,
                        'Hamburguer Classic',
                        CategoryEnum.Sandwich,
                        10,
                        'Muito suculento'
                    )
                    mockProduct.getPrice = vi.fn().mockReturnValue(100)
                    return Promise.resolve(Right(mockProduct))
                } else {
                    return Promise.resolve(Left(new Error('Product not found')))
                }
            }),
        }

        createOrderUseCase = new CreateOrderUseCase(
            mockOrderRepository as IOrderGatewayRepository
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

        expect(mockCustomerRepository.findByCpf).toHaveBeenCalledWith(
            '40418376000'
        )
        expect(mockProductRepository.findById).toHaveBeenCalledWith(
            'valid-product-id'
        )
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
        expect(mockCustomerRepository.findByCpf).not.toHaveBeenCalled()
        expect(mockProductRepository.findById).toHaveBeenCalledWith(
            'valid-product-id'
        )
        expect(mockOrderRepository.create).toHaveBeenCalled()
    })

    it('should throw an error if a product is not found', async () => {
        const orderCustomer: InputCreateOrderDTO = {
            name: 'John Doe',
            cpf: '',
            products: [{ id: 'prod1', quantity: 2 }],
        }

        await expect(createOrderUseCase.execute(orderCustomer)).rejects.toThrow(
            'Product not found'
        )
    })
})
