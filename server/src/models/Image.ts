import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images) // Relacionamento inverso (Múltiplas imagens que correspondem a um orfanato). Funciona da mesma que OneToMany mas para este recebe apenas um orfanato.
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage; // Recebe o orfanato que é dono das imagens
}