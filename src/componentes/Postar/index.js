import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./postar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DotPulse } from "@uiball/loaders";
import LocalizacaoUsuario from "../LocalizacaoUsuario";

const Postar = () => {
  const capturedImagesList = JSON.parse(localStorage.getItem("capturedImages")) || [];
  const navigate = useNavigate();

  const [texto, setTexto] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");

  const userId = sessionStorage.getItem("usuarioId");

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   

    try {
      const response = await axios.post("http://localhost:3000/posts/upload", {
        userId: userId,
        files: capturedImagesList,
        description: texto,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });


      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/inicio");
      }, 3500);
    } catch (error) {
      console.error("Erro ao fazer upload de imagens:", error);
    }
  };


  const handleVoltar = () => {
    navigate("/Camera");
  };

  const removeImage = (index) => {
    setSelectedImage(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedList = [...capturedImagesList];
    updatedList.splice(selectedImage, 1);
    localStorage.setItem("capturedImages", JSON.stringify(updatedList));
    setSelectedImage(null);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setSelectedImage(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="postar-container">
      <button type="button" className="btnVoltar" onClick={handleVoltar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
        </svg>
        Voltar
      </button>

      <form className="postar-form" onSubmit={handleSubmit}>
        <LocalizacaoUsuario onLocationChange={({ latitude, longitude }) => {
          setLatitude(latitude);
          setLongitude(longitude);
        }} />
        <div className="endereco-atual">
          <div id="campos">
            <div id="infoDados">
              <label id="descricaoReferencia">Descrição e/ou referência:</label>
              <input
                id="dados"
                className="iptLoginForm"
                placeholder="Ao lado do banco tal..."
                value={texto}
                onChange={handleChangeTexto}
              />
            </div>
          </div>
        </div>
        
        <div className="captured-images">
          <Carousel>
            {capturedImagesList.map((image, index) => {
              return (
                <Carousel.Item id="itemCar" key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Captured Image ${index}`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="postar-buttons">
          <button type="submit" className="postar-button">
            <i className="bi bi-send"></i>
            Postar
          </button>
        </div>
      </form>
      <Modal
      id="modalSucedido"
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="pergunta">Postagem bem sucedida!</Modal.Title>
          <Modal.Title id="pergunta">
            <DotPulse size={40} speed={1.3} color="#AAA4F2" />
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default Postar;
