import {Entity, Column, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from 'typeorm';

import Estante from '../models/Estante';
import Editora from '../models/Editora';

@Entity('tb_livro')
class Livro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    autor : string;

    //associação (flecha)
    @ManyToOne(type => Estante)
    @JoinColumn({name: "Estante_id", referencedColumnName: "id"})
    Estante: Estante;   

    //agregacao (losango não preenchido)
    @ManyToMany(() => Editora)
    @JoinTable({name : "tb_livro_Editora", 
                joinColumn: {name: "livro_nome", 
                             referencedColumnName: "nome"}, 
                inverseJoinColumn: {name: "Editora_id", 
                                    referencedColumnName: "id"}})
    Editoras: Editora[];

}
export default Livro;