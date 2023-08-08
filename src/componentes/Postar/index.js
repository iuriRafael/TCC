import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './postar.css';

const Postar = () => {
  const location = useLocation();
  const capturedImagesList = location.state || [];
  const navigate = useNavigate();

  const [texto, setTexto] = useState('');
  const [enderecoAtual, setEnderecoAtual] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Adicione esta constante para atualizar o estado das imagens capturadas
  const setCapturedImagesList = (updatedList) => {
    localStorage.setItem('capturedImages', JSON.stringify(updatedList));
    capturedImagesList(updatedList);
  };

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para postar o texto e as imagens
    console.log('Texto postado:', texto);
    console.log('Imagens postadas:', capturedImagesList);
    setTexto('');
  };

  const handleVoltar = () => {
    navigate('/Camera');
  };

  const removeImage = (index) => {
    setSelectedImage(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setCapturedImagesList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(selectedImage, 1);
      return updatedList;
    });
    setSelectedImage(null);
    setShowDeleteModal(false);

    console.log('Imagem removida com sucesso');
  };

  const handleDeleteCancel = () => {
    setSelectedImage(null);
    setShowDeleteModal(false);

    console.log('Remoção de imagem cancelada');
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log('Erro ao obter a localização atual:', error);
          }
        );
      } else {
        console.log('Geolocalização não suportada pelo navegador.');
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const getCurrentAddress = async () => {
      if (latitude && longitude) {
        try {
          const response = await axios.get('https://places-dsn.algolia.net/1/places/reverse', {
            params: {
              latlng: `${latitude},${longitude}`,
              language: 'pt-BR',
            },
          });

          const data = response.data;
          const { road, house_number, neighborhood } = data.address;
          const address = `${road} ${house_number}, ${neighborhood}`;

          setEnderecoAtual(address);
        } catch (error) {
          console.log('Erro ao obter o endereço atual:', error);
        }
      }
    };

    getCurrentAddress();
  }, [latitude, longitude]);

  return (
    <div className="postar-container">
<h2>Postagem</h2>
      <form className="postar-form" onSubmit={handleSubmit}>
        <textarea
          className="postar-textarea"
          resize="none"
          placeholder="Digite o seu texto"
          value={texto}
          onChange={handleChangeTexto}
        />
        <div className="endereco-atual">
          <label>Endereço Atual:</label>
          {enderecoAtual || 'Carregando endereço...'}
        </div>
        <div className="captured-images">
          <h4 id='cap'>Imagens capturadas:</h4>
          <Carousel>
            {capturedImagesList.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image} alt={`Captured Image ${index + 1}`} />
                <button className="remove-button" onClick={() => removeImage(index)}>
                  Remover
                </button>
              </Carousel.Item>
            ))}
          </Carousel>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} tabIndex={-1}>
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza que deseja remover a imagem?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>   
       </div>
  );
};

export default Postar;
