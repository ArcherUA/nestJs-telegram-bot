import {MigrationInterface, QueryRunner} from "typeorm";

export class first1601657243840 implements MigrationInterface {
    name = 'first1601657243840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usdRateArchive" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buy" character varying NOT NULL, "sale" character varying NOT NULL, CONSTRAINT "PK_f9a2b74edf9b00cb6fad9e1a294" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usdRateArchive"`);
    }

}
