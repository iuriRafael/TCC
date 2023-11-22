import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./postar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DotPulse } from "@uiball/loaders";
import LocalizacaoUsuario from "../LocalizacaoUsuario";

import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from "react-places-autocomplete";

const Postar = () => {
  const capturedImagesList =
    JSON.parse(localStorage.getItem("capturedImages")) || [];
  const navigate = useNavigate();

  const [texto, setTexto] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [enderecoInput, setEnderecoInput] = useState("");
  const [enderecoConfirmado, setEnderecoConfirmado] = useState(null);

  const userId = sessionStorage.getItem("usuarioId");
  const userEmail = sessionStorage.getItem("email");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const apiKey = "AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k";

  const nextImage = () => {
    if (currentImageIndex < 2) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else alert("Você só pode adicionar até duas fotos!");
  };

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (latitude === null || longitude === null) {
      alert("Você deve permitir a localização para fazer uma postagem.");
      return;
    }

    try {
      const response = await axios.post("https://mapeamentolixo.onrender.com/posts/upload", {
        userId: userId,
        email: userEmail,
        files: capturedImagesList,
        description: texto,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });

      setShowSuccessModal(true);
      localStorage.removeItem("capturedImages");

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/inicio");
      }, 3500);
    } catch (error) {
      console.error("Erro ao fazer upload de imagens:", error);
    }
  };

  const [streetAddress, setStreetAddress] = useState("");

  const getReverseGeocoding = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      const address = response.data.results[0]?.formatted_address;
      setStreetAddress(address || "Endereço não encontrado");
    } catch (error) {
      console.error("Erro na obtenção do endereço:", error);
      setStreetAddress("Endereço não encontrado");
    }
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getReverseGeocoding(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleVoltar = () => {
    navigate("/Camera");
  };

  const handleEnderecoChange = (endereco) => {
    setEnderecoInput(endereco);
  };

  const handleSelect = async (endereco) => {
    try {
      const results = await geocodeByAddress(endereco);
      const latLng = await getLatLng(results[0]);
      setEnderecoConfirmado({ latitude: latLng.lat, longitude: latLng.lng });
      setLatitude(latLng.lat);
      setLongitude(latLng.lng);
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
      setEnderecoConfirmado(null);
    }
  };

  return (
    <div>
      <button type="button" className="btnVoltarTela" onClick={handleVoltar}>
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

      <div className="postar-container">
        <form className="postar-form" onSubmit={handleSubmit}>
          <div id="address">
            <LocalizacaoUsuario
              onLocationChange={({ latitude, longitude }) => {
                setLatitude(latitude);
                setLongitude(longitude);
              }}
            />
          </div>
          <p>Rua: {streetAddress}</p>
          <div className="buscar-localizacao">
          <label id="descricaoReferencia">O endereço está incorreto?Altere-o aqui.</label>
            <PlacesAutocomplete
              value={enderecoInput}
              onChange={handleEnderecoChange}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Digite o endereço",
                      className: "iptEndereco",
                    })}
                  />
                  <div>
                    {loading ? <div>Carregando...</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <div className="endereco-atual">
            <div id="campos">
              <div id="infoDados">
                <label id="descricaoReferencia">
                  Descrição e/ou referência:
                </label>
                <input
                  id="dados"
                  className="iptEndereco"
                  placeholder="Próximo ao banco..."
                  value={texto}
                  onChange={handleChangeTexto}
                />
              </div>
            </div>
          </div>
          <div className="postar-buttons">
            <button
              type="submit"
              className="postar-button"
              onClick={nextImage}
              disabled={currentImageIndex === 2}
            >
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
    </div>
  );
};

export default Postar;
