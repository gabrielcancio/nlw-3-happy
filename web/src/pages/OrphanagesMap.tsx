import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet'; // Biblioteca nativa do leaflet
import api from '../services/api';

import '../styles/pages/orphanage-map.css';

import mapMarkerImg from '../assets/map-marker.svg';

const mapIcon = Leaflet.icon({ // Função param atribuir um icone para o Leaflet em uma variável
    iconUrl: mapMarkerImg, // Caminho do ícone
    iconSize: [58, 68], 
    iconAnchor: [28, 68], // Reposiciona a imagem contando a partir do canto esquerdo inferior
    popupAnchor: [172, 2] // Reposiciona o popup 
});

interface Orphanage {
    id: string;
    name: string;
    latitude: number;
    longitude:number;
}

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [userPosition, setUserPosition] = useState<[number,number]>([0,0]);

    useEffect(() => {
        api.get('/orphanages').then(response => setOrphanages(response.data));
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setUserPosition([
                latitude,
                longitude
            ]);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Esscolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Luís</strong>
                    <span>Maranhão</span>
                </footer>
            </aside>

            <Map
              center={userPosition}
              zoom={15}
              style={{ width: '100%', height: '100%' }} 
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => (
                    <Marker
                    key={orphanage.id} // Propriedade necessária quando se usa um map para redenrizar algo no React, identificador único, geralemne o id
                    position={[orphanage.latitude, orphanage.longitude]}
                    icon={mapIcon}
                  >
                      <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                          {orphanage.name}
                          <Link to={`/orphanages/${orphanage.id}`}>
                              <FiArrowRight size={20} color="#FFF"/>
                          </Link>
                      </Popup>
                  </Marker>
                ))}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;