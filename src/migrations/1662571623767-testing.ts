import { MigrationInterface, QueryRunner } from "typeorm";

export class testing1662571623767 implements MigrationInterface {
    name = 'testing1662571623767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0d92154f2ba671dd0d50709bb7"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "brand" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_e9d49c80ef71a568270f1e3bdc" ON "coffee" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_78a937a51dbec28cc2c8410c7d" ON "custom_event" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_78a937a51dbec28cc2c8410c7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9d49c80ef71a568270f1e3bdc"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_0d92154f2ba671dd0d50709bb7" ON "coffee" ("name") `);
    }

}
