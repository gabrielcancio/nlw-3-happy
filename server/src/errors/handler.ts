import { ErrorRequestHandler } from 'express'; // Formato da função para lidar com erros
import { ValidationError } from 'yup';  // Importando o tipo/formato dos erros de validação

interface ValidationErrors {
    [key: string]: string[]; // Define que o nome da chave será uma string, e que o valor da chave será um array de strings
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof ValidationError) { // Verifica se o error é uma instancia gerada por um erro de validação do Yup, ou seja, verifica se a variável error tem o tipo/formato de um ValidationError
        let errors: ValidationErrors = {}; // Inicializando o valor de errors como um objeto vazio

        error.inner.forEach(err => {// Pega o erro contigo dentro do parametro "error" que, por usa vez, estão dentro da chave inner
            errors[err.path] = err.errors; // Para cada um dos erros, é atribuido no objeto "errors" criado acima e define as chaves como o nome do campo da requisição onde houve erro e define o valor do erro como o array de erros do yup
        });

        return response.status(400).json({ message: 'Validation fails', errors }); // Retorna o status de bad request e os erros que foram definidosdentro da variável "errors"
    }

    console.error(error); // Exibe o erro no console

    return response.status(500).json({ message: 'Internal server error' }); // Resposta para o client
}

export default errorHandler;