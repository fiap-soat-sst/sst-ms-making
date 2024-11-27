import { Router } from 'express'
import CookingAreaController from '../../../Controllers/CookingAreaController'
import OrderRepository from '../../Database/Repositories/DatabaseRepository/CookingAreaRepository'
import CreateOrderUseCase from '../../../UseCases/Order/create/create.usecase'
import FindOrderByIdUseCase from '../../../UseCases/Order/findById/findById.usecase'
import ListAllOrdersUseCase from '../../../UseCases/Order/listAll/listAll.usecase'
import UpdateStatusUseCase from '../../../UseCases/Order/updateStatus/updateStatus.usecase'
import { RouteTypeEnum } from '../../../Entities/Enums/RouteType'

export default class CookingAreaRoutes {
    private readonly orderRepository: OrderRepository
    private readonly cookingAreaControlller: CookingAreaController
    private createOrderUseCase: CreateOrderUseCase
    private listAllOrdersUseCase: ListAllOrdersUseCase
    private findOrderByIdUseCase: FindOrderByIdUseCase
    private updateStatusUseCase: UpdateStatusUseCase

    constructor() {
        this.orderRepository = new OrderRepository()
        this.listAllOrdersUseCase = new ListAllOrdersUseCase(
            this.orderRepository
        )
        this.findOrderByIdUseCase = new FindOrderByIdUseCase(
            this.orderRepository
        )
        this.updateStatusUseCase = new UpdateStatusUseCase(this.orderRepository)
        this.cookingAreaControlller = new CookingAreaController(
            this.createOrderUseCase,
            this.listAllOrdersUseCase,
            this.findOrderByIdUseCase,
            this.updateStatusUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()

        router.post(
            '/order',
            this.cookingAreaControlller.createOrder.bind(this)
        )
        router.get(
            '/order/:id',
            this.cookingAreaControlller.getOrder.bind(this)
        )
        router.get(
            `/${RouteTypeEnum.PROTECTED}/list-all`,
            this.cookingAreaControlller.listAllOrders.bind(this)
        )
        router.put(
            `/${RouteTypeEnum.PROTECTED}/order/update-status/:id`,
            this.cookingAreaControlller.changeStatus.bind(this)
        )

        return router
    }
}
