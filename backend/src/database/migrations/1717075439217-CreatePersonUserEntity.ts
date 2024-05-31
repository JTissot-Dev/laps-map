import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonUserEntity1717075439217 implements MigrationInterface {
    name = 'CreatePersonUserEntity1717075439217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_2feed8e014c3616133ad13840ae\` ON \`image\``);
        await queryRunner.query(`DROP INDEX \`FK_ab65168cfd5cc95f23b1da3bafb\` ON \`lap\``);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(55) NOT NULL, \`lastName\` varchar(55) NOT NULL, \`birthDay\` date NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_2feed8e014c3616133ad13840ae\` FOREIGN KEY (\`lapId\`) REFERENCES \`lap\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD CONSTRAINT \`FK_ab65168cfd5cc95f23b1da3bafb\` FOREIGN KEY (\`difficultyId\`) REFERENCES \`difficulty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lap\` ADD CONSTRAINT \`FK_603dba6ca42336e5e1d5ed58f6a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lap\` DROP FOREIGN KEY \`FK_603dba6ca42336e5e1d5ed58f6a\``);
        await queryRunner.query(`ALTER TABLE \`lap\` DROP FOREIGN KEY \`FK_ab65168cfd5cc95f23b1da3bafb\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_2feed8e014c3616133ad13840ae\``);
        await queryRunner.query(`ALTER TABLE \`lap\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`CREATE INDEX \`FK_ab65168cfd5cc95f23b1da3bafb\` ON \`lap\` (\`difficultyId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_2feed8e014c3616133ad13840ae\` ON \`image\` (\`lapId\`)`);
    }

}
