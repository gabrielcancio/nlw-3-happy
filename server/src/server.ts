import express from 'express';
import path from 'path';
import './database/connection'; // Importando a conexão com o banco de dados

import routes from './routes';


const app = express();

app.use(express.json()); // Habilita o entendimento do json pela aplicação
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Rota para servir imagens utlizando o método estatic do express qeu recebe o caminho para a pasta de uploads como parametro

app.listen(process.env.PORT || 3333);