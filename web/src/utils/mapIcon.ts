import Leaflet from 'leaflet';
import mapMarkerImg from '../assets/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg, // Variaǘel que contem o caminho da imagem que servirar de icone para o marker
    iconSize: [68, 56], // Tamanho do icone
    iconAnchor: [34, 56], // Reposionamento do icne a partir do canto inferior esquedo
    popupAnchor: [172, 2] // Reposionamento do popup do marker
});

export default mapIcon;