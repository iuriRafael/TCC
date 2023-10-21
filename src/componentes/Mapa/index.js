import React, { useEffect, useRef, useState} from "react";
import Navbar from "../navbar";
import './mapa.css';

import axios from 'axios';

import userIcon from "../imegns/vermelho-removebg-preview.png";
import userIcon2 from "../imegns/R-removebg-preview.png";



function Mapa() {
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    const apiKey = 'AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k';
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const location = response.data.results[0].geometry.location;
        setLat(location.lat);
        setLng(location.lng);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (lat && lng) {
      if (!map) {
        // Inicialize o mapa
        const google = window.google;
        const mapOptions = {
          center: { lat, lng },
          zoom: 15,
        };
        const mapInstance = new google.maps.Map(document.getElementById('map'), mapOptions);
        setMap(mapInstance);
      } else {
        // Atualize o centro do mapa
        map.setCenter({ lat, lng });
      }
    }
  }, [lat, lng, map]);

  return (
    <div>
      <h1>Map</h1>
      <div id="map" style={{ width: '400px', height: '450px' }}></div>
      {/* <Navbar/> */}
    </div>
  );
}


export default Mapa;