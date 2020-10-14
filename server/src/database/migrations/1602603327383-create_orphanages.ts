import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602603327383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [{
        name: 'id',
        type: 'string', 
        unsigned: true, // Não permite valores nulos
        isPrimary: true, // Define chae primaária
        isGenerated: true, // Habilita a geração automática
        generationStrategy: 'uuid' // Esttratégia de geração

      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'latitude',
        type: 'decimal',
        scale: 10,
        precision: 2
      },
      {
        name: 'longitude',
        type: 'decimal',
        scale: 10,
        precision: 2
      },
      {
        name: 'about',
        type: 'text'
      },
      {
        name: 'instructions',
        type: 'text',
      },
      {
        name: 'opening_hours',
        type: 'varchar'
      },
      {
        name: 'open_on_weekends',
        type: 'boolean',
        default: false
      }
    ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
