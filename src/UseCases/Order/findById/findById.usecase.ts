import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import { ICookingAreaGatewayRepository } from '../../../Gateways/contracts/ICookingAreaGatewayRepository'
import { InputFindOrderByIdDTO, OutputFindOrderByIdDTO } from './findById.dto'

export default class FindOrderByIdUseCase {
    constructor(
        private readonly orderRepository: ICookingAreaGatewayRepository
    ) {}

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
