import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './postar.css';

const Postar = () => {
  const location = useLocation();
  const capturedImagesList = location?.state || [];
  const navigate = useNavigate();

  const [texto, setTexto] = useState('');
  const [enderecoAtual, setEnderecoAtual] = useState('');

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para postar o texto
    console.log('Texto postado:', texto);
    setTexto('');
  };

  const handleVoltar = () => {
    navigate('/Camera');
  };

  useEffect(() => {
    const getCurrentAddress = async () => {
      try {
        const response = await fetch(
          'https://api.geoapify.com/v1/ipinfo?apiKey=dd881df269ee42f192ef6f0fc012465d'
        );
        const data = await response.json();
        const {
          city,
          state,
          country,
          postcode,
          street,
          house_number,
        } = data;
        const address = `${street} ${house_number}, ${postcode} ${city}, ${state}, ${country.name}`;
        setEnderecoAtual(address);
      } catch (error) {
        console.log('Erro ao obter o endereço atual:', error);
      }
    };

    getCurrentAddress();
  }, []);

  return (
    <div className="postar-container">
      <h2>Postar</h2>
      <form className="postar-form" onSubmit={handleSubmit}>
        <textarea
          className="postar-textarea" resize="none"
          placeholder="Digite o seu texto"
          value={texto}
          onChange={handleChangeTexto}
        />
        <div className="endereco-atual">
          <label>Endereço Atual:</label>
          {enderecoAtual || 'Carregando endereço...'}
        </div>
        <div className="captured-images">
          {capturedImagesList.map((image, index) => (
            <img key={index} src={image} alt={`Captured Image ${index + 1}`} />
          ))}
        </div>
        <div className="postar-buttons">
          <button type="submit" className="postar-button">
            Postar
          </button>
          <button type="button" className="voltar-button" onClick={handleVoltar}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Postar;