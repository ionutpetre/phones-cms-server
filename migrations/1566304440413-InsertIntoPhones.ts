import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertIntoPhones1566304440413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    INSERT INTO public.phones (type, serial, color, metadata) VALUES
    ('Samsung', 'S9', 'black', '{ "os": "Android" }'),
    ('iPhone', 'X', 'white', '{ "os": "iOS" }'),
    ('Huawei', 'P30', 'blue', '{ "os": "Android", "resolution": "1080x2340" }'),
    ('Samsung', 'S10', 'silver', '{ "os": "Android", "storage": "128" }'),
    ('Google', 'Pixel', 'silver', '{ "os": "Android", "dimensions": "158x76.7x7.9" }'),
    ('Huawei', 'P20', 'silver', '{ "os": "Android" }');`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM phones;');
  }
}
