import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1718651234567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            -- Tabela user (exemplo - ajuste conforme suas colunas reais)
            CREATE TABLE IF NOT EXISTS "user" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar(100) NOT NULL,
                "email" varchar(255) UNIQUE NOT NULL,
                "password" varchar NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now()
            );

            -- Tabela category (ajuste conforme necessário)
            CREATE TABLE IF NOT EXISTS "category" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "user_id" uuid REFERENCES "user"(id),
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now()
            );

            -- Tabela transaction (ajuste conforme necessário)
            CREATE TABLE IF NOT EXISTS "transaction" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "amount" numeric(10,2) NOT NULL,
                "description" varchar,
                "user_id" uuid REFERENCES "user"(id),
                "category_id" uuid REFERENCES "category"(id),
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "transaction";
            DROP TABLE IF EXISTS "category";
            DROP TABLE IF EXISTS "user";
        `);
    }
}