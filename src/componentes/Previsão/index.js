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
  const [loading, setLoading] = useState(true); // Adiciona o estado de loading

  useEffect(() => {
    const obterTemperaturaAtual = async () => {
      try {
        const key = '54182895f993c08880bbaca0a0f49c31';
        const city = ''; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&cnt=7`;
        
        setLoading(true);

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
         
            console.log(data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false); 
            console.error('Erro ao obter os dados das previsões de uma semana:', error);
          });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
            const { name, main: { temp }, weather } = response.data;
            const roundedTemperature = Math.round(temp);
            setTemperature(roundedTemperature);
            setCity(name);
            setWeatherIcon(weather[0].icon);
            setWeatherDescription(traducaoClima[weather[0].main]);
          }, (error) => {
            setLoading(false);
            console.error('Erro ao obter a localização do dispositivo:', error);
          });
        }
      } catch (error) {
        setLoading(false); 
        console.error('Erro ao obter a temperatura atual:', error);
      }
    };

    obterTemperaturaAtual();
    const interval = setInterval(obterTemperaturaAtual, 40000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className='Previsao'>
        {loading && <div className='loader'>Carregando...</div>}
        {!loading && weatherIcon && (
          <img className='clima-icon' src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt='Ícone do clima' />
        )}
        {!loading && (
          <div className='cxItens'>
            <h2 id='temp'>{temperature}°C</h2>
            <p id='state'>{weatherDescription}</p>
          </div>
        )}
        {!loading && <h4 id='city'>{city} RS</h4>}
      </div>
    </div>
  );
}

export default Previsao;