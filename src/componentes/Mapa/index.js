import React, { useEffect, useRef, useState} from "react";
import Navbar from "../navbar";
import './mapa.css';
import Previsao from "../Previsão";
import axios from 'axios';
function Mapa() {
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const postCoordinates = JSON.parse(sessionStorage.getItem("postCoordinates")) || [];

  useEffect(() => {
    
    const apiKey = 'AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k';
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    const apiUrl = postCoordinates.length > 0
      ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${postCoordinates[0].latitude},${postCoordinates[0].longitude}&key=${apiKey}`
      : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const location = response.data.results[0].geometry.location;
        setLat(location.lat);
        setLng(location.lng);
      })
      .catch(error => {
        console.error(error);
      });
  }, [postCoordinates]);

  useEffect(() => {
    if (lat && lng) {
      if (!map) {
        const google = window.google;
        const mapOptions = {
          center: { lat, lng },
          zoom: 15,
        };
        const mapInstance = new google.maps.Map(document.getElementById('map'), mapOptions);
        setMap(mapInstance);

        postCoordinates.forEach((coordenada, index) => {
          new window.google.maps.Marker({
            position: { lat: coordenada.latitude, lng: coordenada.longitude },
            map: mapInstance,
            title: `Post ${index + 1}`,
          });
        });

      } else {
        map.setCenter({ lat, lng });
      }
    }
  }, [lat, lng, map, postCoordinates]);

  return (
    <div id="bodyMapa">
      <Previsao />
      <div id="map"></div>
      <Navbar/>
    </div>
  );
}


export default Mapa;