import { Either, isLeft, isRight } from '../../../@Shared/Either'
import Order from '../../../Entities/Order'
import { ICookingAreaGatewayRepository } from '../../../Gateways/contracts/ICookingAreaGatewayRepository'
import { InputCreateOrderDTO } from './create.dto'

export default class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: ICookingAreaGatewayRepository
    ) {}

    async execute(
        orderCustomer: InputCreateOrderDTO
    ): Promise<Either<Error, Order>> {
        const { name } = orderCustomer
        const order = new Order(name)

        return this.orderRepository.create(order)
    }
}
