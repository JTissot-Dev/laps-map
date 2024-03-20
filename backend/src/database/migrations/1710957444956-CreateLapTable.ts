import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLapTable1710957444956 implements MigrationInterface {
    name = 'CreateLapTable1710957444956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lap\` (\`id\` int NOT NULL AUTO_INCREMENT, \`duration\` time NULL, \`geometry\` linestring NOT NULL, \`difficulty\` varchar(25) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`lap\``);
    }

}
