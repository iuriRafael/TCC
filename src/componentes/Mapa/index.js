import React,{useEffect} from "react";
import Navbar from "../navbar";
import './mapa.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';



function Mapa() {

    useEffect(() => {
        // Coordenadas da localização que você deseja marcar
        const latitude = -22.906847;
        const longitude = -43.172897;
    
        // Crie um objeto de mapa
        const map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([longitude, latitude]),
            zoom: 15, // Ajuste o nível de zoom conforme necessário
          }),
        });
    
        // Crie um marcador personalizado para a localização
        const marker = new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
        });
    
        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: '/', // URL para o ícone do marcador
            scale: 0.1, // Ajuste o tamanho do ícone conforme necessário
          }),
        });
    
        marker.setStyle(iconStyle);
    
        // Crie uma camada vetorial para o marcador
        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [marker],
          }),
        });
    
        // Adicione a camada vetorial ao mapa
        map.addLayer(vectorLayer);
      }, []);

    return (

        <div>
            <div id="map" style={{ width: '100%', height: '700px' }}></div>;
            <Navbar />
        </div>


    );

}

export default Mapa;