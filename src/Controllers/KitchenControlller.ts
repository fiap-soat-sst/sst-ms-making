import { Request, Response } from 'express'
import { isLeft } from '../@Shared/Either'
import ListAllOrdersUseCase from '../UseCases/Order/listAll/listAll.usecase'
import UpdateStatusOrderUseCase from '../UseCases/Order/updateStatus/updateStatus.usecase'
import FindOrderByIdUseCase from '../UseCases/Order/findById/findById.usecase'
import CreateOrderUseCase from '../UseCases/Order/create/create.usecase'

export default class MakingController {
    private createOrderUseCase: CreateOrderUseCase
    private listAllOrdersUseCase: ListAllOrdersUseCase
    private findOrderByIdUseCase: FindOrderByIdUseCase
    private updatePrepareStatusUseCase: UpdateStatusOrderUseCase

    constructor(
        createOrderUseCase: CreateOrderUseCase,
        listAllOrdersUseCase: ListAllOrdersUseCase,
        findOrderByIdUseCase: FindOrderByIdUseCase,
        updatePrepareStatusUseCase: UpdateStatusOrderUseCase
    ) {
        this.listAllOrdersUseCase = listAllOrdersUseCase
        this.findOrderByIdUseCase = findOrderByIdUseCase
        this.updatePrepareStatusUseCase = updatePrepareStatusUseCase
        this.createOrderUseCase = createOrderUseCase
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        const order = req.body
        const result = await this.createOrderUseCase.execute(order)

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json({
                order: {
                    id: order.getId(),
                    status: order.getStatus(),
                },
            })
        }
    }
    async listAllOrders(req: Request, res: Response): Promise<void> {
        const result = await this.listAllOrdersUseCase.execute()

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const orders = result.value
            res.status(200).json({ orders })
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.findOrderByIdUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }

    async changeStatus(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const result = await this.updatePrepareStatusUseCase.execute({ id })

        if (isLeft(result)) {
            res.status(400).json(result.value.message)
        } else {
            const order = result.value
            res.status(200).json(order)
        }
    }
}
