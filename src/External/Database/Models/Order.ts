import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { StatusEnum } from '../../../Entities/Enums/StatusEnum'

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
        type: 'text',
        length: 30,
        nullable: true,
        unique: false,
    })
    customer: string

    @Column({
        type: 'text',
        nullable: false,
    })
    orderItems: string

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date
}
