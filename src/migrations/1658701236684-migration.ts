import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658701236684 implements MigrationInterface {
  name = 'migration1658701236684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "brand" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "brand"`);
  }
}
