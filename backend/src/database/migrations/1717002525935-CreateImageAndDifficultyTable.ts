import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageAndDifficultyTable1717002525935 implements MigrationInterface {
    name = 'CreateImageAndDifficultyTable1717002525935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imgUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lapId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`difficulty\` (\`id\` int NOT NULL AUTO_INCREMENT, \`level\` varchar(55) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lap\` DROP COLUMN \`difficulty\``);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD \`name\` varchar(55) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD \`difficultyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lap\` CHANGE \`duration\` \`duration\` time NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_2feed8e014c3616133ad13840ae\` FOREIGN KEY (\`lapId\`) REFERENCES \`lap\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD CONSTRAINT \`FK_ab65168cfd5cc95f23b1da3bafb\` FOREIGN KEY (\`difficultyId\`) REFERENCES \`difficulty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lap\` DROP FOREIGN KEY \`FK_ab65168cfd5cc95f23b1da3bafb\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_2feed8e014c3616133ad13840ae\``);
        await queryRunner.query(`ALTER TABLE \`lap\` CHANGE \`duration\` \`duration\` time NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lap\` DROP COLUMN \`difficultyId\``);
        await queryRunner.query(`ALTER TABLE \`lap\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD \`difficulty\` varchar(25) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`difficulty\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
