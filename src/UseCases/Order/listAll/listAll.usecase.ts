import { Either, isLeft, Right } from '../../../@Shared/Either'
import IOrderRepository from '../../../External/Database/Repositories/Contracts/IOrderRepository'
import { OutputListAllOrdersDTO } from './listAll.dto'

export default class ListAllOrdersUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(): Promise<Either<Error, OutputListAllOrdersDTO[]>> {
        const orders = await this.orderRepository.getAll()

        if (isLeft(orders)) {
            return orders
        }

        const ordersDTO = orders.value.map((order) => {
            return order.toJSON()
        })

        return Right<OutputListAllOrdersDTO[]>(ordersDTO)
    }
}
