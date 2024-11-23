import { Either, isLeft, Right } from '../../../@Shared/Either'
import IOrderRepository from '../../../External/Database/Repositories/Contracts/IOrderRepository'
import { InputFindOrderByIdDTO, OutputFindOrderByIdDTO } from './findById.dto'

export default class FindOrderByIdUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute({
        id,
    }: InputFindOrderByIdDTO): Promise<Either<Error, OutputFindOrderByIdDTO>> {
        const order = await this.orderRepository.get(id)

        if (isLeft(order)) {
            return order
        }

        return Right<OutputFindOrderByIdDTO>(order.value.toJSON())
    }
}
