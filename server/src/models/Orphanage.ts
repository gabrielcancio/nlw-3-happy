import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orphanages') // Decorator que relaciona esta classe com o a tabela orphanages
export default class Orphanage {
    @PrimaryGeneratedColumn('uuid') // Define a propriedade id como primaria e gera um valor para coluna do tipo uuid. Uma alternativa sem gerar um valor seria o @PrimaryColumn
    id: string;

    @Column() // Define a propriedade como uma coluna no banco de dados
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean;
}