import { describe, it, expect, vi, beforeEach } from 'vitest'
import FinishOrderUseCase from '../../../src/UseCases/Order/updateStatus/updateStatus.usecase'
import { isLeft, isRight, Left, Right } from '../../../src/@Shared/Either'
import { InputUpdateStatusDTO } from '../../../src/UseCases/Order/updateStatus/updateStatus.dto'
import Order from '../../../src/Entities/Order'
import { StatusEnum } from '../../../src/Entities/Enums/StatusEnum'
import StatusOrderException from '../../../src/@Shared/StatusOrderException'
import IOrderRepository from '../../../src/External/Database/Repositories/Contracts/IOrderRepository'

describe('FinishOrderUseCase', () => {
    let finishOrderUseCase: FinishOrderUseCase
    let mockOrderRepository: Partial<IOrderRepository>

    beforeEach(() => {
        mockOrderRepository = {
            get: vi.fn(),
            update: vi.fn(),
        }

        finishOrderUseCase = new FinishOrderUseCase(
            mockOrderRepository as IOrderRepository
        )
    })

    it('should return an error if the order does not exist', async () => {
        const orderId = 'nonexistent-order-id'

        mockOrderRepository.get = vi
            .fn()
            .mockResolvedValue(Left<Error>(new Error('Order not found')))

        const input: InputUpdateStatusDTO = { id: orderId, status: 'Finished' }
        const result = await finishOrderUseCase.execute(input)

        expect(isLeft(result)).toBe(true)
        if (isLeft(result)) {
            expect(result.value.message).toBe('Order not found')
        }
        expect(mockOrderRepository.get).toHaveBeenCalledWith(orderId)
    })

    it('should update the order status to "Finished" when the order is "Ready"', async () => {
        const mockOrder = new Order('customer-id', '123', StatusEnum.Ready)
        mockOrder.updateStatus = vi.fn()

        mockOrderRepository.get = vi.fn().mockResolvedValue(Right(mockOrder))
        mockOrderRepository.update = vi.fn().mockResolvedValue(Right('123'))

        const input: InputUpdateStatusDTO = { id: '123', status: 'Finalizado' }

        const result = await finishOrderUseCase.execute(input)

        expect(isRight(result)).toBe(true)
        if (isRight(result)) {
            expect(result.value).toBe('123')
        }
        expect(mockOrder.updateStatus).toHaveBeenCalledWith(StatusEnum.Finished)
        expect(mockOrderRepository.update).toHaveBeenCalledWith(mockOrder)
    })

    it('should return an error if the current order status does not allow finishing', async () => {
        const invalidStatusOrder = new Order(
            'customer-id',
            '123',
            StatusEnum.Preparing
        )

        invalidStatusOrder.updateStatus = vi.fn(() => {
            throw new StatusOrderException(
                'Only orders with status Ready can be finished'
            )
        })

        mockOrderRepository.get = vi
            .fn()
            .mockResolvedValue(Right(invalidStatusOrder))

        const input: InputUpdateStatusDTO = { id: '123', status: 'Finished' }

        await expect(finishOrderUseCase.execute(input)).rejects.toThrow(
            'Only orders with status Ready can be finished'
        )
    })
})
