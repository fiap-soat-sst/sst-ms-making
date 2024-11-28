export interface InputCreateOrderDTO {
    name: string
    cpf: string
    products: [
        {
            id: string
            name: string
            category: string
            quantity: number
        }
    ]
}
