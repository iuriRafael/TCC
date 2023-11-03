import React, { useState, useEffect } from "react";
import "./local.css"


function LocalizacaoUsuario({ onLocationChange }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [error, setError] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          onLocationChange({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          setError("Não foi possível obter a localização. Verifique suas configurações de permissão.");
          console.error(error);
        }
      );
    } else {
      setError("Geolocalização não é suportada por este navegador.");
      console.error("Geolocalização não é suportada por este navegador.");
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);



  return (
    <div>
      <h2 className="nomeUserPost">Localização de {localStorage.getItem("nome")}:</h2>
      {lat != null && lng != null && (
        <div id="coordenadas">
          <p className="cods">Latitude: {lat}</p>
         
          <p className="cods">Longitude: {lng}</p>
        </div>
      )}
    </div>
  );
}

export default LocalizacaoUsuario;