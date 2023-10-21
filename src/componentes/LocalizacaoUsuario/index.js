import React, { useState, useEffect } from "react";

function LocalizacaoUsuario({ onLocationChange }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          // Chame a função onLocationChange com as coordenadas
          onLocationChange({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <h2>Localização do Usuário:</h2>
      {lat != null && lng != null && (
        <div>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
        </div>
      )}
    </div>
  );
}

export default LocalizacaoUsuario;