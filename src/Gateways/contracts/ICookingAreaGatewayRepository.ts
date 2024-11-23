import { Either } from '../../@Shared/Either'
import Order from '../../Entities/Order'

export interface ICookingAreaGatewayRepository {
    create(order: Order): Promise<Either<Error, Order>>
    update(order: Order): Promise<Either<Error, string>>
    get(id: string): Promise<Either<Error, Order>>
    getAll(): Promise<Either<Error, Order[]>>
    list(): Promise<Either<Error, Order[]>>
}
