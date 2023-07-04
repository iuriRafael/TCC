import React, { useEffect, useRef, useState } from 'react';
import './Camera.css';
import { useNavigate } from 'react-router-dom';

function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImagesList, setCapturedImagesList] = useState([]);

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

          console.log('Foto escolhida:', dataURL);
        };
        reader.readAsDataURL(file);
      }
    };

    inputElement.click();
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
          <div id="imgCap">
            {capturedImagesList.map((image, index) => (
              <img key={index} src={image} alt={`Captured Image ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraPage;