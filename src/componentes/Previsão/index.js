import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Previsao.css';

const traducaoClima = {
  Clear: 'Ensolarado',
  Clouds: 'Nublado',
  Rain: 'Chuvoso',
  Thunderstorm: 'Tempestade',
  Snow: 'Neve',
  Drizzle: 'Chuvisco',
  Mist: 'Nevoeiro',
  Smoke: 'Fumaça',
  Haze: 'Névoa',
  Dust: 'Poeira',
  Fog: 'Nevoeiro',
  Sand: 'Areia',
  Ash: 'Cinzas',
  Squall: 'Vendaval',
  Tornado: 'Tornado',
};

function Previsao() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');

  useEffect(() => {
    const obterTemperaturaAtual = async () => {
      try {
        const key = '54182895f993c08880bbaca0a0f49c31';
        
        // Obter a localização do dispositivo (latitude e longitude)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
            const { name, main: { temp }, weather } = response.data;
            const roundedTemperature = Math.round(temp);
            setTemperature(roundedTemperature);
            setCity(name);
            setWeatherIcon(weather[0].icon);
            setWeatherDescription(traducaoClima[weather[0].main]);
          }, (error) => {
            console.error('Erro ao obter a localização do dispositivo:', error);
          });
        }
      } catch (error) {
        console.error('Erro ao obter a temperatura atual:', error);
      }
    };

    obterTemperaturaAtual();
    const interval = setInterval(obterTemperaturaAtual, 60000); // Atualiza a temperatura a cada 1 minuto

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className='Previsao'>
        {weatherIcon && (
          <img className='clima-icon' src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt='Ícone do clima' />
        )}
        <div className='cxItens'>
          <h2 id='temp'>{temperature}°C</h2>
          <p id='state'>{weatherDescription}</p>
        </div>
        <h4 id='city'>{city} RS</h4>
      </div>
    </div>
  );
}

export default Previsao;