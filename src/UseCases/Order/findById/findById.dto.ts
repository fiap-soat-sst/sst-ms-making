import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

export interface InputFindOrderByIdDTO {
    id: string
}

export interface OutputFindOrderByIdDTO {
    id: string | null
    items: {
        id: string | null
        product: {
            id: string
            name: string
            category: CategoryEnum
            price: number
            description: string
        }
        quantity: number
        total: number
    }[]
    customer: string
    total: number
    closed: boolean
    status: StatusEnum
    createdAt: Date
}
