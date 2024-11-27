import { MigrationInterface, QueryRunner } from 'typeorm'

export class Order1732678294020 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "order" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "nameCustomer" character varying NOT NULL,
                "orderItems" text NULL,
                "status" character varying NOT NULL DEFAULT 'Received',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "closed" boolean NOT NULL DEFAULT false,
                "customer" character varying,
                "updateAt" TIMESTAMP NOT NULL DEFAULT now()
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`)
    }
}
