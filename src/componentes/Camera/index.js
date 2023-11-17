import React, { useEffect, useRef, useState, useLocation } from "react";
import "./Camera.css";
import { useNavigate } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import trash from "../img/botoes/Trash V2/trashV2.json";
function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const MAX_IMAGES = 1;

  const retornar = () => {
    navigate("/Inicio");
  };

  useEffect(() => {
    const accessCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.log("Erro ao acessar a câmera:", error);
      }
    };

    accessCamera();
  }, []);


  const [capturedImagesList, setCapturedImagesList] = useState(() => {
    const savedImages = localStorage.getItem("capturedImages");
    return savedImages ? JSON.parse(savedImages) : [];
  });

  useEffect(() => {
    localStorage.setItem("capturedImages", JSON.stringify(capturedImagesList));
    setShowButton(capturedImagesList.length > 1);
  }, [capturedImagesList]);

  const takePhoto = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      const context = canvasElement.getContext("2d");
      context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const dataURL = canvasElement.toDataURL("image/jpeg");

      setCapturedImagesList((prevList) => {
        const updatedList = [...prevList];
        if (updatedList.length < MAX_IMAGES) {
          updatedList.push(dataURL);
        }
        return updatedList;
      });
    }
  };

  const chooseFromLibrary = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.capture = "camera";

    inputElement.onchange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target.result;

          setCapturedImagesList((prevList) => [...prevList, dataURL]);
          setCapturedImage(dataURL);

          console.log("Foto escolhida:", dataURL);
        };
        reader.readAsDataURL(file);
      }
    };

    inputElement.click();
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

    console.log("Imagem removida com sucesso");
  };

  const handleDeleteCancel = () => {
    setSelectedImage(null);
    setShowDeleteModal(false);

    console.log("Remoção de imagem cancelada");
  };

  const handleAvancar = () => {
    if (capturedImagesList.length === 1) {
      setShowCarousel(true);
      navigate("/Postar");
    } else alert("Apenas uma foto é permitida.");
  };

  const handleModalKeyDown = (event) => {
    if (event.key === "Enter") {
      handleDeleteConfirm();
    }
  };

  return (
    <div>
      <button
        id="btnVoltar"
        onClick={retornar}
        disabled={false}
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
  
      </button>
      <div className="camera-container">
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        <div className="button-container">
          <button id="tirarFoto" onClick={takePhoto}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-camera-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
            Tirar Foto
          </button>
          <button id="escolherFoto" onClick={chooseFromLibrary}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-upload"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            Carregar imagem
          </button>
          {capturedImagesList.length > 0 && (
            <button className="avancarButton" onClick={handleAvancar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
              Avançar
            </button>
          )}
        </div>
      </div>
      {capturedImagesList.length > 0 && (
        <div id="conteinerFts">
          {showCarousel ? (
            <Carousel>
              {capturedImagesList.map((image, index) => (
                  <img
                    className="d-block w-100"
                    id="imgCap"
                    src={image}
                    alt={`Captured Image ${index + 1}`}
                  />
                  
              ))}
            </Carousel>
          ) : (
            <>
              <div id="imgCap">
                {capturedImagesList.map((image, index) => (
                  <div id="cxImgBatida" key={index}>
                    <img
                      className="captured-image"
                      src={image}
                      alt={`Captured Image ${index + 1}`}
                    />
                    <button
                      className="remove-button"
                      onClick={() => removeImage(index)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="#fff"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>              
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onKeyDown={handleModalKeyDown}
        tabIndex={-1}
      >
        <Modal.Header
          closeButton
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onKeyDown={handleModalKeyDown}
          tabIndex={-1}
        >
          <Modal.Title id="pergunta">
            Tem certeza que deseja remover a imagem?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer id="btnsModal">
          <Button
            id="btnCancelar"
            variant="secondary"
            onClick={handleDeleteCancel}
          >
            Cancelar
          </Button>
          <Button
            id="btnConfirmar"
            variant="primary"
            onClick={handleDeleteConfirm}
          >
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CameraPage;
