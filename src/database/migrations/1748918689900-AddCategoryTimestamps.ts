import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryTimestamps1748918689900 implements MigrationInterface {
    name = 'AddCategoryTimestamps1748918689900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "category_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "transaction_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "transaction_category_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "value" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "category_pkey"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "transaction_pkey"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "user_pkey"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "user_email_key"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "user_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "created_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
