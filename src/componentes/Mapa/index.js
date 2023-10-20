import React, { useEffect, useRef} from "react";
import Navbar from "../navbar";
import './mapa.css';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import userIcon from "../imegns/vermelho-removebg-preview.png";
import userIcon2 from "../imegns/R-removebg-preview.png";



function Mapa({ onLocationChange }) {
  const mapRef = useRef(null); // Utilize useRef para armazenar uma referência ao mapa
  const mapInitialized = useRef(false);

  useEffect(() => {
    // Inicialize o mapa Leaflet apenas se ele ainda não estiver inicializado
    if (!mapInitialized.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

      // Adicione uma camada de mapa (por exemplo, um mapa de rua)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Obtenha a localização do usuário
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
      
          onLocationChange({ latitude, longitude });
      
          L.marker([latitude, longitude],{icon: userIcon})
          .addTo(map)
            .bindPopup('Sua Localização Atual')
            .openPopup();
        });
      }

      

      // Atualize o estado para indicar que o mapa foi inicializado
      mapInitialized.current = true;

    }
  }, [onLocationChange]);// Certifique-se de passar um array vazio para que o efeito seja executado apenas uma vez
  

  


  return (
    <div>
      <div ref={mapRef} style={{ height: '400px' }}></div>
      <Navbar />
    </div>
  );
}

export default Mapa;