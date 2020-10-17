import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";
import api from "../services/api";

export default function CreateOrphanage() {
  const [position, setPosition] = useState<[number, number]>([0,0]);
  const [userPosition, setUserPosition] = useState<[number, number]>([0,0]);

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    instructions: '',
    opening_hours: ''
  });

  const history = useHistory();

  /**
   * name x
   * about x
   * latitude x
   * logitude x
   * instructions x
   * opening_hours x
   * open_on_weekends: x
   * images: x
   * 
  */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setUserPosition([
        latitude,
        longitude
      ]);
    });
  },[]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition([
      lat,
      lng
    ]);
  }

  function handleInputChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormData({
      ...formData,
      [id]: value,
    });

  }

  function handleTextAreaChangeEvent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { id, value } = event.target;

    setFormData({
      ...formData,
      [id]: value
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const [latitude, longitude] = position;
    const { name, about, instructions, opening_hours  } = formData;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await api.post('/orphanages', data);

      alert('Cadastro realizado com sucesso');

      setTimeout(() => {
          history.push('/app');
      }, 3000);

    } catch(err) {
      alert('Erro ao cadastrar orfanato. Tente novamente')

      console.log(err);
    }
  }

  function handleSelectedFiles(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) { // Evitar que a função continue executando sem arquivos selecionados, evitando passar um tipo null para o state 
      return;
    }

    const selectedImages =  Array.from(event.target.files); // Transformando o obejto em array com o Array.from(), indicado quando as chaves dos arrays são números

    setImages(selectedImages); 

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image); // Criando URL de preview com o URL.createObjectURL()
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={userPosition} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position[0] !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={position} 
                />
              ) }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                onChange={handleInputChangeEvent}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                onChange={handleTextAreaChangeEvent}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return <img key={image} src={image} alt={formData.name}/>
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectedFiles}
              />  {/*O multiple serve para adicionar mais de uma arquivo */}

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                onChange={handleTextAreaChangeEvent}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de visitação</label>
              <input
                id="opening_hours" 
                onChange={handleInputChangeEvent}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active': ''}
                onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                 type="button"
                 className={!open_on_weekends ? 'active': ''}
                 onClick={() => setOpenOnWeekends(false)}
                 >
                   Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
