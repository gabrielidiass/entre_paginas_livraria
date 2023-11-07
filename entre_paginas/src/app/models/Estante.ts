import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tb_estante')

class Estante {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 100 })
    genero: string;
    
    @Column("varchar", { length: 100 })
    livros: string;
}
export default Estante;