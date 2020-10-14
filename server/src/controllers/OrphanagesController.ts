import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; // O typeorm utiliza o repository pattern
import Orphanages from '../models/Orphanage';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.find();

        return response.json(orphanage);
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
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanages); // A função getRepository quando recebe a instância do model atribui todos o metodos do repositório da variável em orphanage repository
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        }); // Faz uma pré criação do orfanato no banco de dados com os dados do objeto data
        
        await orphanagesRepository.save(orphanage); // O método save executa a query definida pelo metodo create, recebendo a variavel que contem a isntruções para a query (orphanage)
    
        return response.status(201).json(orphanage);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.json(orphanage);
    }

}