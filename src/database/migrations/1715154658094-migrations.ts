import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715154658094 implements MigrationInterface {
  name = 'Migrations1715154658094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`previousPassword\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`previousPassword\``,
    );
  }
}
