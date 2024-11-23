import { Router } from 'express'
import MakingController from '../../../Controllers/CookingAreaControlller'
import OrderRepository from '../../Database/Repositories/DatabaseRepository/OrderRepository'
import CreateOrderUseCase from '../../../UseCases/Order/create/create.usecase'
import FindOrderByIdUseCase from '../../../UseCases/Order/findById/findById.usecase'
import ListAllOrdersUseCase from '../../../UseCases/Order/listAll/listAll.usecase'
import UpdateStatusUseCase from '../../../UseCases/Order/updateStatus/updateStatus.usecase'
import { RouteTypeEnum } from '../../../Entities/Enums/RouteType'

export default class CookingAreaRoutes {
    private readonly orderRepository: OrderRepository
    private readonly cookingAreaControlller: MakingController
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
        this.cookingAreaControlller = new MakingController(
            this.createOrderUseCase,
            this.listAllOrdersUseCase,
            this.findOrderByIdUseCase,
            this.updateStatusUseCase
        )
    }

    buildRouter(): Router {
        const router = Router()

        router.post('/', this.cookingAreaControlller.createOrder.bind(this))
        router.get('/:id', this.cookingAreaControlller.getOrder.bind(this))
        router.get(
            `/${RouteTypeEnum.PROTECTED}`,
            this.cookingAreaControlller.listAllOrders.bind(this)
        )
        router.get(
            `/${RouteTypeEnum.PROTECTED}/list-all`,
            this.cookingAreaControlller.listAllOrders.bind(this)
        )
        router.put(
            `/${RouteTypeEnum.PROTECTED}/prepare-order/:id`,
            this.cookingAreaControlller.changeStatus.bind(this)
        )
        router.put(
            `/${RouteTypeEnum.PROTECTED}/finish-prepare-order/:id`,
            this.cookingAreaControlller.changeStatus.bind(this)
        )
        router.put(
            `/${RouteTypeEnum.PROTECTED}/finish-order/:id`,
            this.cookingAreaControlller.changeStatus.bind(this)
        )

        return router
    }
}
