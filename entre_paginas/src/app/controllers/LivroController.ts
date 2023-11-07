import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Livro from '../models/Livro';
import Estante from '../models/Estante';

class LivroController{

    async find(req: Request, res: Response){
        const repository = getRepository(Livro);

        const id = req.params.id;

        const j = await repository.createQueryBuilder('tb_livro').where({"id" : id}).innerJoinAndSelect("tb_livro.Estante", "Estante").leftJoinAndSelect("tb_livro.editora", "editora").getOne();

        if(j){     
            console.log(j);      
            return res.json(j);
        }else{
            return res.sendStatus(204);
        }
    }
  
    async list(req: Request, res: Response){
        const repository = getRepository(Livro);

        const lista = await repository.createQueryBuilder('tb_Livro').innerJoinAndSelect("tb_Livro.Estante", "Estante").leftJoinAndSelect("tb_Livro.patentes", "patente").getMany();

        return res.json(lista);
    }

    async delete(req: Request, res: Response){

        const repository = getRepository(Livro);//recupera o repositorio do Livro.
        
        const id = req.params.id;
        
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.

        if(idExists){
        
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar Livro para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Livro);//recupera o repositorio do Livro.
    
        const {id} = req.body;//extrai os atributos id do corpo da mensagem
    
        const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
        
        if(!idExists){
            return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Livro
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
    }

    async store(req: Request, res: Response){

        const repository = getRepository(Livro);//recupera o repositorio do Patente.

        const repositoryEstante = getRepository(Estante);//recupera o repositorio do Patente.

        const {id} = req.body;//extrai os atributos id do corpo da mensagem

        const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.

        if(!idExists){

            let Estante = new Estante(); //cria uma instancia de Estante.
            Estante.nome = req.body.Estante.nome;
            Estante.cnpj = req.body.Estante.cnpj;            

            const result = await repositoryEstante.save(Estante);//efetiva a operacao de insert.                        

            const j = new Livro();

            j.id = req.body.id;
            j.nome = req.body.nome;
            j.autor = req.body.autor;  
            j.editora = req.body.editora;          
            j.estante = result; 
            j.funcionario = req.body.funcionario;
                        
            await repository.save(j);//efetiva a operacao de insert do Livro.
    
            return res.json(j);//retorna o bojeto json no response.

        }else{

            return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
        }
        
    }
 



}

export default new LivroController();