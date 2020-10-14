import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602683807275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'string',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'path', // Caminho para a imagem
          type: 'varchar'
        },
        {
          name: 'orphanage_id', // Campo para armazenar o id do orfanato (Chave estrangeira)
          type: 'string'
        }
      ],
      foreignKeys: [
        {
          name: 'ImageOrphanage', // Definindo a chave estrangeira
          columnNames: ['orphanage_id'], // Coluna onde a chave estrangeira vai ser armazenada
          referencedTableName: 'orphanages', // Tabela a quala chave estrangeira está se referindo
          referencedColumnNames: ['id'], // Campo na tabela a qual a chave estrangeira está se relacionando
          onUpdate: 'CASCADE', // Define efeito de atualização como cascata, se id (Chave primária) for alterado na tabela orphanages, o id será alterado na tabela de imagens
          onDelete: 'CASCADE' // Define o efeito cascata para deletação, caso o orfanato seja deletado as imagens também serão deletadas
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
