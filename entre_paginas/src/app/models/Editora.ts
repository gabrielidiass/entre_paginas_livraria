import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tb_editora')
class Editora {//codigo fonte referente ao pdf da parte 7.

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    cnpj: string;

    @Column('text')
    livros: string;

}
export default Editora;