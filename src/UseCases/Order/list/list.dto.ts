import { CategoryEnum } from '../../../Entities/Enums/CategoryEnum'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

export interface OutputListOrdersDTO {
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
    }[]
    customer: string
    closed: boolean
    status: StatusEnum
    createdAt: Date
}
