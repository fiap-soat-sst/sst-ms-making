import { Either } from '../../../@Shared/Either'
import Order from '../../../Entities/Order'
import IOrderRepository from '../../../External/Database/Repositories/Contracts/IOrderRepository'
import { InputCreateOrderDTO } from './create.dto'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

export default class CreateOrderUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(
        orderCustomer: InputCreateOrderDTO
    ): Promise<Either<Error, Order>> {
        const { name, products } = orderCustomer
        const order = new Order(
            name,
            null,
            StatusEnum.Received,
            new Date(),
            products
        )

        return this.orderRepository.create(order)
    }
}
