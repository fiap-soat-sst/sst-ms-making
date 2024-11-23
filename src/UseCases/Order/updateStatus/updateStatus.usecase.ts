import { Either, isLeft, Left, Right } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import { ICookingAreaGatewayRepository } from '../../../Gateways/contracts/ICookingAreaGatewayRepository'
import { InputUpdateStatusDTO } from './updateStatus.dto'

export default class UpdateStatusUseCase {
    constructor(
        private readonly orderRepository: ICookingAreaGatewayRepository
    ) {}

    async execute({
        id,
    }: InputUpdateStatusDTO): Promise<Either<Error, string>> {
        const order = await this.orderRepository.get(id)

        if (isLeft(order)) {
            return order
        }

        order.value.updateStatus(StatusEnum.Finished)
        return this.orderRepository.update(order.value)
    }
}
