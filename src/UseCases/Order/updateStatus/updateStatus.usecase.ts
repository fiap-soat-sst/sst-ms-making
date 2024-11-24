import { Either, isLeft } from '../../../@Shared/Either'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'
import IOrderRepository from '../../../External/Database/Repositories/Contracts/IOrderRepository'
import { InputUpdateStatusDTO } from './updateStatus.dto'

export default class UpdateStatusUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

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
