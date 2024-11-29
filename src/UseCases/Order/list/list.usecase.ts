import { Either, isLeft, Right } from '../../../@Shared/Either'
import { ICookingAreaGatewayRepository } from '../../../Gateways/contracts/ICookingAreaGatewayRepository'
import { OutputListOrdersDTO } from './list.dto'

export default class ListOrdersUseCase {
    constructor(
        private readonly orderRepository: ICookingAreaGatewayRepository
    ) {}

    async execute(): Promise<Either<Error, OutputListOrdersDTO[]>> {
        const orders = await this.orderRepository.list()
        if (isLeft(orders)) {
            return orders
        }

        const ordersDTO = orders.value.map((order) => {
            return order.toJSON()
        })

        return Right<OutputListOrdersDTO[]>(ordersDTO)
    }
}
