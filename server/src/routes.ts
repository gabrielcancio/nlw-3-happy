import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'; // Configuração do multer
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router(); // Atribui o sistema de roteamento do express a variável routes
const upload = multer(uploadConfig); // Atribui os métodos de upload segundo as configurações pré definidas

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images') , OrphanagesController.create); // Lê as requisições multi platform, o método array habilita a request de vários arquivos no campo images

export default routes;