import multer from 'multer'; // Biblioteca para requisições multi platform
import path from 'path'; // Biblioteca para caminhos dentro do sistema

export default {
    storage: multer.diskStorage({ // Storage determina como o arquivo será armazenado. O multer.diskStorage armazena o arquivo em disco.
        destination: path.join(__dirname, '..', '..' ,'uploads'), // Refere-se o caminho onde serão armazenado os arquivos
        filename: (request, file, cb) => { // filename refere-se  ao nome em que o arquivo será salvo
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);

            // request refere-se aos dados e métodos da request
            // file contém todos os dados referentes ao arquivo
            // cb é uma callabck, recebe como o primeiro parâmetro um erro e como segundo o resultado
        }
    })
}