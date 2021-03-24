import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressRefactor1616615743863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" RENAME COLUMN "address" TO "title"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" RENAME COLUMN "title" TO "address"`,
        );
    }

}
