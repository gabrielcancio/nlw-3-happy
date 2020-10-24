import Image from '../models/Image';
import getIP from '../utils/getIP';

const ip = getIP();

export default {
  render(image: Image) { // Método para renerizar uma imagem
    return {
      id: image.id,
      url: `http://${ip}:3333/uploads/${image.path}` // Atribuindo uma url para servir que as imagens que será usado numa rota para servir imagens
    }
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
}