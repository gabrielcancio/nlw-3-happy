import express from 'express';
import './database/connection'; // Importando a conexão com o banco de dados

import routes from './routes';


const app = express();

app.use(express.json()); // Habilita o entendimento do json pela aplicação
app.use(routes);

app.listen(process.env.PORT || 3333);