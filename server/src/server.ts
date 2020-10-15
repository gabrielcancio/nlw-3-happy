import express from 'express';
import path from 'path';
import 'express-async-errors'; // Executando o express-async-erros para que ele faça a leitura dos erros assíncronos

import './database/connection'; // Importando a conexão com o banco de dados

import routes from './routes';
import errorHandler from './errors/handler'; // Função que lida com erros


const app = express();

app.use(express.json()); // Habilita o entendimento do json pela aplicação
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Rota para servir imagens utlizando o método estatic do express qeu recebe o caminho para a pasta de uploads como parametro
app.use(errorHandler); // Aplica o error handler para todas as rotas, é importante que este esteja após todas as rotas

app.listen(process.env.PORT || 3333);