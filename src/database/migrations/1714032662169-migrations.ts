import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1714032662169 implements MigrationInterface {
  name = 'Migrations1714032662169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`email_code\`
                             (
                                 \`id\`        int          NOT NULL AUTO_INCREMENT,
                                 \`code\`      varchar(255) NOT NULL,
                                 \`email\`     varchar(255) NOT NULL,
                                 \`expireAt\`  datetime     NOT NULL,
                                 \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP (6),
                                 \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6),
                                 \`deletedAt\` datetime(6) NULL,
                                 INDEX         \`IDX_3e0fa39a45499b3eb321fe1f5c\` (\`code\`),
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`role\`
                             (
                                 \`id\`   int          NOT NULL,
                                 \`name\` varchar(255) NOT NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`user\`
                             (
                                 \`id\`        int          NOT NULL AUTO_INCREMENT,
                                 \`username\`  varchar(255) NOT NULL,
                                 \`password\`  varchar(255) NULL,
                                 \`email\`     varchar(255) NULL,
                                 \`account\`   varchar(255) NULL,
                                 \`publicKey\` varchar(255) NULL,
                                 \`hash\`      varchar(255) NULL,
                                 \`status\`    int          NOT NULL,
                                 \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP (6),
                                 \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6),
                                 \`deletedAt\` datetime(6) NULL,
                                 \`roleId\`    int NULL,
                                 INDEX         \`IDX_e282acb94d2e3aec10f480e4f6\` (\`hash\`),
                                 UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`user\`
        ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(` INSERT INTO role (id, name)
                              VALUES (1, 'Admin')`);
    await queryRunner.query(` INSERT INTO role (id, name)
                              VALUES (2, 'User')`);

    await queryRunner.query(`  INSERT INTO user (id, roleId, username, password, email,
                                                 account, publicKey, hash, status, createdAt, updatedAt,
                                                 deletedAt)
                               VALUES (8, 1, 'admin',
                                       '$2a$10$XqmBK4WyuEM2OrtAinhQV.PPk7cx8PDBD9DZVCP0JUJs1cbFo8mH6',
                                       'api@api.com', '0.0.119', '21312', '123', 1, '2023-12-14 09:41:10',
                                       '2023-12-14 09:41:10', null) `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e282acb94d2e3aec10f480e4f6\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3e0fa39a45499b3eb321fe1f5c\` ON \`email_code\``,
    );
    await queryRunner.query(`DROP TABLE \`email_code\``);
  }
}
