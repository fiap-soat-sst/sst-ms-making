import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Request, Response } from 'express'
import CookingAreaController from '../../src/Controllers/CookingAreaController'
import { Left, Right } from '../../src/@Shared/Either'
import CreateOrderUseCase from '../../src/UseCases/Order/create/create.usecase'
import ListOrdersUseCase from '../../src/UseCases/Order/list/list.usecase'
import ListAllOrdersUseCase from '../../src/UseCases/Order/listAll/listAll.usecase'
import FindOrderByIdUseCase from '../../src/UseCases/Order/findById/findById.usecase'
import UpdateStatusUseCase from '../../src/UseCases/Order/updateStatus/updateStatus.usecase'

describe('OrderController', () => {
    let cookingAreacontroller: CookingAreaController
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>

    let createOrderUseCase: Partial<CreateOrderUseCase>
    let listOrdersUseCase: Partial<ListOrdersUseCase>
    let listAllOrdersUseCase: Partial<ListAllOrdersUseCase>
    let findOrderByIdUseCase: Partial<FindOrderByIdUseCase>
    let updateStatusUseCase: Partial<UpdateStatusUseCase>

    beforeEach(() => {
        createOrderUseCase = { execute: vi.fn() }
        listAllOrdersUseCase = { execute: vi.fn() }
        findOrderByIdUseCase = { execute: vi.fn() }
        updateStatusUseCase = { execute: vi.fn() }

        cookingAreacontroller = new CookingAreaController(
            createOrderUseCase as CreateOrderUseCase,
            listAllOrdersUseCase as ListAllOrdersUseCase,
            findOrderByIdUseCase as FindOrderByIdUseCase,
            updateStatusUseCase as UpdateStatusUseCase
        )

        mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            setHeader: vi.fn(),
        }
    })

    it('startOrder - should create a new order and return 201 status', async () => {
        const mockOrder = 'order-id'
        mockRequest = {
            body: { user_name: 'John', cpf: '99390063060', products: [] },
        }
        createOrderUseCase.execute = vi.fn().mockResolvedValue(Right(mockOrder))

        await cookingAreacontroller.createOrder(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(201)
        expect(mockResponse.setHeader).toHaveBeenCalledWith(
            'Location',
            `/orders/${mockOrder}`
        )
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'created successfully',
            id: mockOrder,
        })
    })

    it('createOrder - should return 400 if user_name is missing', async () => {
        mockRequest = { body: { cpf: '123456789', products: [] } }
        await cookingAreacontroller.createOrder(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'user_name is required',
        })
    })

    it('listOrders - should return orders with 200 status', async () => {
        const mockOrders = [{ id: '1' }, { id: '2' }]
        listAllOrdersUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrders))

        await cookingAreacontroller.listAllOrders(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ orders: mockOrders })
    })

    it('listAllOrders - should return all orders with 200 status', async () => {
        const mockOrders = [{ id: '1' }, { id: '2' }]
        listAllOrdersUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrders))

        await cookingAreacontroller.listAllOrders(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ orders: mockOrders })
    })

    it('getOrder - should return an order by id with 200 status', async () => {
        const mockOrder = { id: '123' }
        mockRequest = { params: { id: '123' } }
        findOrderByIdUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrder))

        await cookingAreacontroller.getOrder(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockOrder)
    })

    it('prepareOrder - should prepare an order and return 200 status', async () => {
        const mockOrder = { id: '123', status: 'Preparing' }
        mockRequest = { params: { id: '123' } }
        updateStatusUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrder))

        await cookingAreacontroller.changeStatus(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockOrder)
    })

    it('finishPrepareOrder - should finish preparing an order and return 200 status', async () => {
        const mockOrder = { id: '123', status: 'Ready' }
        mockRequest = { params: { id: '123' } }
        updateStatusUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrder))

        await cookingAreacontroller.changeStatus(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockOrder)
    })

    it('finishOrder - should finish an order and return 200 status', async () => {
        const mockOrder = { id: '123', status: 'Finished' }
        mockRequest = { params: { id: '123' } }
        updateStatusUseCase.execute = vi
            .fn()
            .mockResolvedValue(Right(mockOrder))

        await cookingAreacontroller.changeStatus(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(mockOrder)
    })

    it('should return 400 status if an error occurs in any use case', async () => {
        const error = new Error('Test error')
        createOrderUseCase.execute = vi.fn().mockResolvedValue(Left(error))

        mockRequest = {
            body: { user_name: 'John', cpf: '123456789', products: [] },
        }

        await cookingAreacontroller.createOrder(
            mockRequest as Request,
            mockResponse as Response
        )

        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith(error.message)
    })
})
