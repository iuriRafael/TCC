import React, { useEffect, useRef, useState } from 'react';
import './Camera.css';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImagesList, setCapturedImagesList] = useState([]);
  const [showButton, setShowButton] = useState(false); // Estado para controlar a exibição do botão "Avançar"
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1); // Estado para controlar o índice da imagem selecionada

  const retornar = () => {
    navigate('/Inicio');
  };

  useEffect(() => {
    const accessCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.log('Erro ao acessar a câmera:', error);
      }
    };

    accessCamera();
  }, []);

  const takePhoto = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      const context = canvasElement.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

      const dataURL = canvasElement.toDataURL('image/jpeg');

      // Adiciona a imagem à lista de imagens capturadas
      setCapturedImagesList((prevList) => [...prevList, dataURL]);
      setCapturedImage(dataURL);

      setShowButton(true); // Exibe o botão "Avançar"
    }
  };

  const chooseFromLibrary = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.capture = 'camera';

    inputElement.onchange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target.result;

          // Adiciona a imagem à lista de imagens capturadas
          setCapturedImagesList((prevList) => [...prevList, dataURL]);
          setShowButton(true); // Exibe o botão "Avançar"

          console.log('Foto escolhida:', dataURL);
        };
        reader.readAsDataURL(file);
      }
    };

    inputElement.click();
  };

  const removeImage = (index) => {
    setSelectedImageIndex(index); // Define o índice da imagem selecionada para exclusão

    if (capturedImagesList.length === 1) {
      // Caso seja a última imagem, remove diretamente
      setCapturedImagesList([]);
      setShowButton(false);
    }
  };

  const handleDeleteConfirm = () => {
    // Remove a imagem selecionada com base no índice
    setCapturedImagesList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(selectedImageIndex, 1);
      return updatedList;
    });

    setSelectedImageIndex(-1); // Redefine o índice da imagem selecionada para -1
    setShowButton(capturedImagesList.length > 1); // Exibe o botão "Avançar" se ainda houver mais imagens

    console.log('Imagem removida com sucesso');
  };

  const handleDeleteCancel = () => {
    setSelectedImageIndex(-1); // Redefine o índice da imagem selecionada para -1

    console.log('Remoção de imagem cancelada');
  };

  const handleAvancar = () => {
    // Implemente a lógica para avançar para a próxima tela aqui
    navigate("/Postar");
  };

  return (
    <div>
      <button className="btnVoltar" onClick={retornar} disabled={false} type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>
        Voltar
      </button>
      <div className="camera-container">
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div className="button-container">
          <button id="tirarFoto" onClick={takePhoto}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
            Tirar Foto
          </button>
          <button id="escolherFoto" onClick={chooseFromLibrary}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            Carregar imagem
          </button>
        </div>
      </div>
      {capturedImagesList.length > 0 && (
        <div>
          <h2>Imagens capturadas:</h2>
          <Carousel>
            {capturedImagesList.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image} alt={`Captured Image ${index + 1}`} />
                <button className="remove-button" onClick={() => removeImage(index)}>
                  <svg id="iconDeletar" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#4F5285" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </Carousel.Item>
            ))}
          </Carousel>
          {showButton && (
            <>
              {selectedImageIndex === -1 ? (
                <button className="avancar-button" onClick={handleAvancar}>
                  Avançar
                </button>
              ) : (
                <div className="delete-confirmation">
                  <p>Deseja realmente excluir esta imagem?</p>
                  <button className="delete-confirm" onClick={handleDeleteConfirm}>
                    Confirmar
                  </button>
                  <button className="delete-cancel" onClick={handleDeleteCancel}>
                    Cancelar
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CameraPage;