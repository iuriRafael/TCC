import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Postar = () => {
  const location = useLocation();
  const capturedImagesList = location?.state || [];
  const navigate = useNavigate();
  
  const [texto, setTexto] = useState('');

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

  return (
    <div className="postar-container">
      <h2>Postar</h2>
      <form className="postar-form" onSubmit={handleSubmit}>
        <textarea
          className="postar-textarea"
          placeholder="Digite o seu texto"
          value={texto}
          onChange={handleChangeTexto}
        />
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
