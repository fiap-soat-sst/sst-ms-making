import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { StatusEnum } from '../../Entities/Enums/StatusEnum'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @Column({
        length: 60,
        nullable: false,
        unique: false,
    })
    nameCustomer: string

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
    closed: boolean

    @Column({
        type: 'enum',
        enum: StatusEnum,
        name: 'status',
    })
    status: StatusEnum

    @Column({
        type: 'string',
        nullable: true,
        length: 30,
    })
    customer: string

    @Column({
        type: 'array',
        nullable: false,
    })
    orderItems: any[]
}
