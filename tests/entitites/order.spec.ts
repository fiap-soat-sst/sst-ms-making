import { describe, it, expect } from 'vitest'
import Order from '../../src/Entities/Order'
import { StatusEnum } from '../../src/Entities/Enums/StatusEnum'
import StatusOrderException from '../../src/@Shared/StatusOrderException'
import OrderWithOutProductsException from '../../src/@Shared/OrderWithOutProductsException'
import InvalidCustomerException from '../../src/@Shared/InvalidCustomerException'

describe('Order', () => {
    it('should create an order', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Recebido' as StatusEnum,
            new Date(),
            [
                {
                    name: 'Hamburguer',
                    quantity: 1,
                },
            ]
        )
        expect(order).toBeTruthy()
        expect(order.getId()).toBe('order-id')
        expect(order.getCustomer()).toBe('customer-id')
        expect(order.getStatus()).toBe(StatusEnum.Received)
        expect(order.getCreatedAt()).toBeInstanceOf(Date)
        expect(order.getItems()).toEqual([
            {
                name: 'Hamburguer',
                quantity: 1,
            },
        ])
        expect(order.isClosed()).toBe(false)
        expect(order.getItemsAsString()).toBe(JSON.stringify(order.getItems()))
    })

    it('should update the order status', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Recebido' as StatusEnum
        )
        order.updateStatus(StatusEnum.Preparing)
        expect(order.getStatus()).toBe(StatusEnum.Preparing)
    })

    it('should not update the order status', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Recebido' as StatusEnum
        )
        expect(() => order.updateStatus(StatusEnum.Ready)).toThrow(
            new StatusOrderException(
                'Only orders with status Preparing can be ready'
            )
        )
    })

    it('should not update the order status from Received to Finished', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Recebido' as StatusEnum
        )
        expect(() => order.updateStatus(StatusEnum.Finished)).toThrow(
            new StatusOrderException(
                'Only orders with status Ready can be finished'
            )
        )
    })

    it('should not update the order status from Finished to Ready', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Recebido' as StatusEnum
        )
        expect(() => order.updateStatus(StatusEnum.Ready)).toThrow(
            new StatusOrderException(
                'Only orders with status Preparing can be ready'
            )
        )
    })

    it('should not start an order with status preparing', () => {
        const order = new Order(
            'customer-id',
            'order-id',
            'Preparado' as StatusEnum
        )
        expect(() => order.updateStatus(StatusEnum.Preparing)).toThrow(
            new StatusOrderException(
                'Only orders with status Received can be prepare'
            )
        )
    })

    it('should throw an error if has no items', () => {
        const order = new Order('customer-id')
        expect(() => order.closeOrder()).toThrow(
            new OrderWithOutProductsException()
        )
    })

    it('should throw an error if no customer was provided', () => {
        expect(() => new Order('')).toThrow(new InvalidCustomerException())
    })

    it('should throw and error if id is not provided', () => {
        expect(
            () => new Order('customer', undefined, StatusEnum.Finished)
        ).toThrow(
            new StatusOrderException('New orders must have status Received')
        )
    })
})
