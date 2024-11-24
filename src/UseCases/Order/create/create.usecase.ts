import { Either } from '../../../@Shared/Either'
import Order from '../../../Entities/Order'
import IOrderRepository from '../../../External/Database/Repositories/Contracts/IOrderRepository'
import { InputCreateOrderDTO } from './create.dto'

export default class CreateOrderUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(
        orderCustomer: InputCreateOrderDTO
    ): Promise<Either<Error, Order>> {
        const { name } = orderCustomer
        const order = new Order(name)

        return this.orderRepository.create(order)
    }
}
