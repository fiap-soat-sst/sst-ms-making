import InvalidCustomerException from '../@Shared/InvalidCustomerException'
import OrderWithOutProductsException from '../@Shared/OrderWithOutProductsException'
import StatusOrderException from '../@Shared/StatusOrderException'
import { StatusEnum } from './Enums/StatusEnum'

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
        createdAt: Date = new Date()
    ) {
        this.id = id
        this.items = JSON.parse('[]')
        this.customer = customer
        this.closed = false
        this.status = status
        this.createdAt = createdAt
        this.validator()
    }

    getId(): string | null {
        return this.id
    }

    getItems(): any[] {
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

    getTotalOrderValue(): number {
        return this.items.reduce(
            (total, currentItem) => total + currentItem.getTotalValue(),
            0
        )
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
            total: this.getTotalOrderValue(),
            closed: this.closed,
            status: this.status,
            createdAt: this.createdAt,
        }
    }
}
