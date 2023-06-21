
import React, { useEffect, useRef } from 'react';
import './Camera.css'

function CameraPage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const accessCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
  
        // Aqui você pode manipular a imagem capturada, enviar para o servidor, etc.
        const dataURL = canvasElement.toDataURL('image/jpeg');
        console.log('Foto capturada:', dataURL);
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
            console.log('Foto escolhida:', dataURL);
          };
          reader.readAsDataURL(file);
        }
      };
  
      inputElement.click();
    };
  
    return (
      <div>
        <h1>Página da Câmera</h1>
        <div>
          <video ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
        <div>
          <button onClick={takePhoto}>Tirar Foto</button>
          <button onClick={chooseFromLibrary}>Escolher da Biblioteca</button>
        </div>
      </div>
    );
  }
  
  export default CameraPage;