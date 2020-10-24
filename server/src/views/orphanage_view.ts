import Orphanage from '../models/Orphanage';
import imageView from './image_view';

// A view faz uma seriliazação dos dados, definindo o que será retornado na resposta da requisição HTTP

export default {
  render(orphanage: Orphanage) { // Método para renderizar um único orfanato
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imageView.renderMany(orphanage.images)
    }
  },
  
  renderMany(orphanages: Orphanage[]) { // Método para renderizar vários orfanatos, ou seja, um array de orfanatos
    return orphanages.map(orphanage => this.render(orphanage)); // Faz um map com os orfanatos e aplica para cada orfanato o método deste obejto, autorefernciado pela variável this
  }
}