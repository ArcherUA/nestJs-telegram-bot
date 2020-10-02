"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.first1601657243840 = void 0;
class first1601657243840 {
    constructor() {
        this.name = 'first1601657243840';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "usdRateArchive" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buy" character varying NOT NULL, "sale" character varying NOT NULL, CONSTRAINT "PK_f9a2b74edf9b00cb6fad9e1a294" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "usdRateArchive"`);
    }
}
exports.first1601657243840 = first1601657243840;
//# sourceMappingURL=1601657243840-first.js.map