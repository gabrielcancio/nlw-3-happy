import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; // O typeorm utiliza o repository pattern
import * as Yup from 'yup';
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

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true', // Corrigir bug do envio de true como string, implementar casting do yup
            images
        }

        const schema = Yup.object().shape({ // Define um esquema de validacão, onde é recebido o objetod e dados da requisição com o seguinte formato
            name: Yup.string().required(), // Define o campo como uma string obrigatória
            latitude: Yup.number().required(), // Define o campo como um number obrigatório
            longitude: Yup.number().required(), // Define o campo como um number obrigatório
            about: Yup.string().required().max(300), // Define o campo como uma string obrigatória de no máximo 300 caracteres
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(), // Define o campo como um boolean obrigatório
            images: Yup.array( //Define o campo como array
                Yup.object().shape({ // Define o que é esperado dos elementos contidos no array
                    path: Yup.string().required()
                })
            )
        }); // Obs:Para mudar a mensagem do erro é so atribuir uma string com a mensagem do erro como parÂmentro no método que especifica o campo EX: .required('Nome obrigatório')

        await schema.validate(data, { // Executa o esquema de validação
            abortEarly: false // Define que o Yup irá ler todos os campos antes de reportar os erros
        }); // Após feito esquema de validação é necessário criar uma tratativa diferente para os erros de validação no handler de errors
    
        const orphanagesRepository = getRepository(Orphanages); // A função getRepository quando recebe a instância do model atribui todos o metodos do repositório da variável em orphanage repository
    
        const orphanage = orphanagesRepository.create(data); // Faz uma pré criação do orfanato no banco de dados com os dados do objeto data
        // Recebe o objeto de dados esperados pelo model Image, como foi definido no relacionamento
        
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