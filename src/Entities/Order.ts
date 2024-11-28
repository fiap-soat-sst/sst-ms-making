import e from 'express'
import InvalidCustomerException from '../@Shared/InvalidCustomerException'
import OrderWithOutProductsException from '../@Shared/OrderWithOutProductsException'
import StatusOrderException from '../@Shared/StatusOrderException'
import { StatusEnum } from './Enums/StatusEnum'
import { InputCreateOrderDTO } from '../UseCases/Order/create/create.dto'

export interface items {
    id: string
    name: string
    category: string
    quantity: number
}

export default class Order {
    private id: string | null
    private items: any[]
    private customer: string
    private status: StatusEnum
    private closed: boolean
    private createdAt: Date

    constructor(
        customer: string,
        id: string | null = null,
        status: StatusEnum = StatusEnum.Received,
        createdAt: Date = new Date(),
        items: items[] = []
    ) {
        this.customer = customer
        this.id = id
        this.status = status
        this.createdAt = createdAt
        this.items = items
        this.closed = false
        this.validator()
    }

    getId(): string | null {
        return this.id
    }

    getItems(): items[] {
        return this.items
    }

    getItemsAsString(): string {
        return JSON.stringify(this.items)
    }

    getCustomer(): string {
        return this.customer
    }

    getStatus(): StatusEnum {
        return this.status
    }

    getCreatedAt(): Date {
        return this.createdAt
    }

    isClosed(): boolean {
        return this.closed
    }

    closeOrder(): void {
        this.closed = true
        this.validator()
    }

    updateStatus(status: StatusEnum): void {
        if (
            status === StatusEnum.Preparing &&
            this.status !== StatusEnum.Received
        ) {
            throw new StatusOrderException(
                'Only orders with status Received can be prepare'
            )
        }
        if (
            status === StatusEnum.Ready &&
            this.status !== StatusEnum.Preparing
        ) {
            throw new StatusOrderException(
                'Only orders with status Preparing can be ready'
            )
        }
        if (
            status === StatusEnum.Finished &&
            this.status !== StatusEnum.Ready
        ) {
            throw new StatusOrderException(
                'Only orders with status Ready can be finished'
            )
        }
        this.status = status
    }

    private validator(): void {
        if (this.closed === true && this.items.length === 0) {
            throw new OrderWithOutProductsException()
        }

        if (!this.customer) {
            throw new InvalidCustomerException()
        }

        if (!this.id && this.status !== StatusEnum.Received) {
            throw new StatusOrderException(
                'New orders must have status Received'
            )
        }
    }

    toJSON() {
        return {
            id: this.id,
            items: this.items.map((item) => item.toJSON()),
            customer: this.customer,
            closed: this.closed,
            status: this.status,
            createdAt: this.createdAt,
        }
    }
}
