import { MigrationInterface, QueryRunner } from 'typeorm'

export class Order1732678294020 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `order` (`id` varchar(36) NOT NULL PRIMARY KEY, `orderItems` TEXT NULL, `status` VARCHAR(10) NOT NULL DEFAULT 'Received', `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `closed` BOOLEAN NOT NULL DEFAULT false, `customer` VARCHAR(60), `updateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`)
    }
}
