import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Previsao.css';

function Previsao() {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');

    useEffect(() => {
        const obterTemperaturaAtual = async () => {
            try {
                const key = '54182895f993c08880bbaca0a0f49c31';
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Igrejinha&appid=${key}&units=metric`);
                const { main: { temp }, weather } = response.data;
                setTemperature(temp);
                setCity('Igrejinha');
                setWeatherIcon(weather[0].icon);
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

            <div className='Previsão'>

                {weatherIcon && (
                    <img className='clima-icon' src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt='Ícone do clima' />
                )}
                <h2 id='temp'>{temperature}°C</h2>
                <h4 id='city'>{city}</h4>
            </div>
        </div>


    );
}

export default Previsao;
