import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePhones1566304139078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    CREATE TABLE public.phones (
      id serial PRIMARY KEY,
      type varchar(100) NOT NULL,
      serial varchar(100) NOT NULL,
      color varchar(50) NOT NULL,
      metadata JSON
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query('DROP TABLE phones;');
  }
}
