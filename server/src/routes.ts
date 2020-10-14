import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router(); // Atribui o sistema de roteamento do express a variável routes

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', OrphanagesController.create);

export default routes;