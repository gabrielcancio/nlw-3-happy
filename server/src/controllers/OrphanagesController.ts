import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; // O typeorm utiliza o repository pattern
import Orphanages from '../models/Orphanage';
import orphanageView from '../views/orphanage_view';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanages);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] // Procura relacionamentos no campo image do model de orfanatos
        });

        return response.json(orphanageView.renderMany(orphanages));
    },


    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body; // Pegando dados da requisição

        const requestImages = request.files as Express.Multer.File[]; // Pegando as imagens que são obejtos e setando manualmente o formato delas como array de arquivos do multer(Express.Multer.File[])
        const images = requestImages.map(image => {
            return { path: image.filename }
        });
    
        const orphanagesRepository = getRepository(Orphanages); // A função getRepository quando recebe a instância do model atribui todos o metodos do repositório da variável em orphanage repository
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images // Recebe o objetos esperados no model Image, como foi definido no relacionamento
        }); // Faz uma pré criação do orfanato no banco de dados com os dados do objeto data
        
        await orphanagesRepository.save(orphanage); // O método save executa a query definida pelo metodo create, recebendo a variavel que contem a isntruções para a query (orphanage)
    
        return response.status(201).json(orphanageView.render(orphanage));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'] // Procura por relacionamento no campo images do model de orfanatos
        });

        return response.json(orphanageView.render(orphanage));
    }

}