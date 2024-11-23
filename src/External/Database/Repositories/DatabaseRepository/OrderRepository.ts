import { Repository } from 'typeorm'
import { AppDataSource } from '../../MySqlAdapter'
import { Either, Right, Left } from '../../../../@Shared/Either'
import { StatusEnum } from '../../../../Entities/Enums/StatusEnum'
import { Order as model } from '../../Models/Order'
import IOrderRepository from '../Contracts/IOrderRepository'
import Order from '../../../../Entities/Order'

export default class OrderRepository implements IOrderRepository {
    private repository: Repository<model>

    constructor() {
        this.repository = AppDataSource.getRepository(model)
    }

    async create(order: Order): Promise<Either<Error, string>> {
        try {
            const customer = order.getCustomer()
            const orderModel = new model()
            orderModel.orderItems = []
            orderModel.nameCustomer = customer
            orderModel.orderItems = order.getItems()
            orderModel.status = order.getStatus()
            orderModel.createdAt = order.getCreatedAt()

            const orderSaved = await this.repository.save(orderModel)

            return Right<string>(orderSaved.id)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async update(order: Order): Promise<Either<Error, string>> {
        try {
            const orderJSON = order.toJSON()

            if (!orderJSON.id) {
                return Left<Error>(new Error('Order not found'))
            }

            const orderToUpdate = await this.repository.findOneBy({
                id: orderJSON.id,
            })

            if (!orderToUpdate) {
                return Left<Error>(new Error('Order not found'))
            }

            orderToUpdate.orderItems = []
            orderToUpdate.status = orderJSON.status
            orderToUpdate.nameCustomer = order.getCustomer()
            orderToUpdate.orderItems = order.getItems()

            const orderSaved = await this.repository.save(orderToUpdate)

            return Right<string>(orderSaved.id)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async get(id: string): Promise<Either<Error, Order>> {
        try {
            const orderFind = await this.repository.findOne({
                where: {
                    id,
                },
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!orderFind) {
                return Left<Error>(new Error('Order not found'))
            }

            const order = new Order(
                orderFind.nameCustomer,
                orderFind.id,
                orderFind.status,
                orderFind.createdAt
            )

            return Right<Order>(order)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async getAll(): Promise<Either<Error, Order[]>> {
        try {
            const ordersFind = await this.repository.find({
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!ordersFind) {
                return Left<Error>(new Error('Orders not found'))
            }

            const orders = ordersFind.map((order) => {
                const orderEntity = new Order(
                    order.nameCustomer,
                    order.id,
                    order.status,
                    order.createdAt
                )

                return orderEntity
            })

            return Right<Order[]>(orders)
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
    async list(): Promise<Either<Error, Order[]>> {
        try {
            const ordersFind = await this.repository.find({
                relations: ['customer', 'orderItems', 'orderItems.product'],
            })

            if (!ordersFind) {
                return Left<Error>(new Error('Orders not found'))
            }

            const orders = ordersFind.map((order) => {
                const orderEntity = new Order(
                    order.nameCustomer,
                    order.id,
                    order.status,
                    order.createdAt
                )

                return orderEntity
            })

            orders.sort(
                (a, b) =>
                    a.getCreatedAt().getTime() - b.getCreatedAt().getTime()
            )

            const readyOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Ready
            )
            const preparingOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Preparing
            )
            const receivedOrders = orders.filter(
                (order) => order.getStatus() === StatusEnum.Received
            )

            return Right<Order[]>([
                ...readyOrders,
                ...preparingOrders,
                ...receivedOrders,
            ])
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }
}
