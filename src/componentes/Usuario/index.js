import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from 'react-bootstrap';
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/botoes/do-utilizador.png";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importe a biblioteca Cookies

import Previsao from "../Previsão";

function Usuario(props) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaindo, setIsSaindo] = useState(false);

  // Recupere o nome do usuário dos cookies
  const nomeUsuario = Cookies.get('nome');

  function handleSair() {
    setModalIsOpen(true);
  }

  function handleConfirmarSair() {
    setIsSaindo(true);
    setTimeout(() => {

      Cookies.remove('nome');
      Cookies.remove('email');

      setIsSaindo(false);
      setModalIsOpen(false);
      navigate('/Login');
    }, 2500);
  }

  function handleCancelarSair() {
    setModalIsOpen(false);
  }

  function handleAndamento() {
    navigate('/Andamento');
  }

  function handleClick() {
    navigate('/Finalizado');
  }

  return (
    <div>
      <Previsao />
      <div className="Container">
        <div id="cxPerfil">
          <img className="perfil" src={perfil} alt="Perfil" />
        </div>
        <h2 id="nomeUsuario">{nomeUsuario}</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={handleAndamento} disabled={false}>
            <div id="iconAndamento">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                {/* ... (código SVG) ... */}
              </svg>
            </div>
            Em andamento
          </button>

          <button id="btnFinalizado" onClick={handleClick} disabled={false}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                {/* ... (código SVG) ... */}
              </svg>
            </div>
            Tarefas finalizadas
          </button>

          <button id="btnSair" onClick={handleSair} disabled={false}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                {/* ... (código SVG) ... */}
              </svg>
            </div>
            Sair da conta
          </button>
        </div>
      </div>

      <Navbar />

      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header>
          <Modal.Title id="pergunta">Tem certeza que deseja sair da conta?</Modal.Title>
        </Modal.Header>
        <Modal.Footer id="btnsModal">
          <Button id="btnCancelar" variant="secondary" onClick={handleCancelarSair}>
            Cancelar
          </Button>
          <Button id="btnConfirmar" variant="primary" onClick={handleConfirmarSair}>
            {isSaindo ? <Spinner animation="border" size="sm" /> : "Confirmar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Usuario;
