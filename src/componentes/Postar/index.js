import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './postar.css';

const Postar = () => {
  const location = useLocation();
  const capturedImagesList = JSON.parse(localStorage.getItem("capturedImages")) || [];
  const navigate = useNavigate();

  const [texto, setTexto] = useState('');
  const [enderecoAtual, setEnderecoAtual] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [referencia, setReferencia] = useState("");

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  async function handleClick(file) {

    axios.post("http://localhost:3000/posts/criar", {

      "files": file , 
      "nome": localStorage.getItem("nome"),
      "descricao": texto,
      "referencia": referencia,
      "endereco": enderecoAtual
    })
    navigate('/inicio');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para postar o texto e as imagens
    console.log('Texto postado:', texto);
    console.log('Imagens postadas:', capturedImagesList);
    setTexto('');
    handleClick(capturedImagesList);
  };

  const handleVoltar = () => {
    navigate('/Camera');
  };

  const removeImage = (index) => {
    setSelectedImage(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedList = [...capturedImagesList];
    updatedList.splice(selectedImage, 1);
    localStorage.setItem('capturedImages', JSON.stringify(updatedList));
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
      <div id='cxBtnVoltar'>
        <button type="button" className="voltarButton" onClick={handleVoltar}>
          Voltar
        </button>
      </div>

      <form className="postar-form" onSubmit={handleSubmit}>
        <textarea
          className="postar-textarea"
          resize="none"
          placeholder="Digite o seu texto"
          value={texto}
          onChange={handleChangeTexto}
        />
        <div className="endereco-atual">
          <div id='campos'>
            <div>
              <label>Endereço Atual:</label>
              <input id='address' placeholder='Digite o seu endereço:' value={enderecoAtual} onChange={(event) => setEnderecoAtual(event.target.value)} />
            </div>
            <div>
              <label>Referência:</label>
              <input id='references' placeholder='Ao lado do banco tal...' value={referencia} onChange={(event) => setReferencia(event.target.value)} />
            </div>
          </div>
        </div>
        <div className="captured-images">
          <Carousel>
            {capturedImagesList.map((image, index) => {
              console.log(image);
              return (
                <Carousel.Item id='itemCar' key={index}>
                  <button className="remove-button" onClick={() => removeImage(index + 1)}>
                    Remover
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                  <img className="d-block w-100" src={image} alt={`Captured Image ${index}`} />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
        <div className="postar-buttons">
          <button type="submit" className="postar-button" disabled={false}>
            Postar
          </button>

        </div>
      </form>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} tabIndex={-1}>
        <Modal.Header closeButton>
          <Modal.Title id="pergunta">Tem certeza que deseja remover a imagem?</Modal.Title>
        </Modal.Header>
        <Modal.Footer id="btnsModal">
          <Button id="btnCancelar" variant="secondary" onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button id="btnConfirmar" variant="primary" onClick={handleDeleteConfirm}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Postar;