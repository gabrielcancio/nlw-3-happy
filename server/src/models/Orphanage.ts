import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

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

    @OneToMany(() => Image, image => image.orphanage, {  // Este decorator é utilizado no relacionamento "Um para muitos", no caso um orfanato pode ter multiplas fotos
        cascade: ['insert', 'update'] // O terceiro parâmetro é um parametro de conig. Na chave cascade pode-se definir o efeito cascata para determiandas ações. No caso, quando for cadastrado/atualizado um novo orfanato, as imagens tmabém serão cadastradas/atualizadas na tabela, desde que as imagens sejam passadas no campo images no model de orfanato no momentod a criação.
    })
    @JoinColumn({ name: 'orphanage_id' }) // Nome da coluna que guarda o relaciomaneto que armazena o relacionamento de orfanato com imagens
    images: Image[] // Este campo refere-se as imagens que um orfanato pode ter (nome de imagens/paths)
}

/**
 * @OneToMany(() => Image) - Recebe dois parâmetros, o primeiro é uma função que retorna o tipo/formato do retorno(De cada elemento do relacionamento)
 *                         - O segundo parâmetro, para cada elemento do relacionamento (imagens) retorna o campo dentro deste elemento (imagem) que identifica o relacionamento inverso, o orfanato
 *                         - Resumindo: O primiero parâmetro é uma função que retorna o tipo dos elementos, noc aso é uma imagem, e o segundo parâmetro é uma função que pega cada elemento(imagem) e retorna o campo dentro desta imagem que identifíca o orfanato dono desta imagem
*/