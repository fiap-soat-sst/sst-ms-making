import { CategoryEnum } from '../../src/Entities/Enums/CategoryEnum'
import { randomUUID } from 'crypto'

export const createMockInputProduct = () => {
    return {
        name: 'Hamburguer Classic',
        category: CategoryEnum.Sandwich,
        price: 10,
        description: 'Muito suculento',
    }
}

export const createMockProduct = () => {
    return {
        id: randomUUID(),
        name: 'Hamburguer Classic',
        category: CategoryEnum.Sandwich,
        price: 10,
        description: 'Muito suculento',
    }
}
