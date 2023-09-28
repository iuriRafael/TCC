import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from 'react-bootstrap';
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/botoes/do-utilizador.png";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importe a biblioteca Cookies
import "bootstrap-icons/font/bootstrap-icons.css";
import Previsao from "../Previsão";

function Usuario(props) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaindo, setIsSaindo] = useState(false);


  function handleSair() {
    setModalIsOpen(true);
  }

  function handleConfirmarSair() {
    setIsSaindo(true);
    setTimeout(() => {



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
  function handleFinalizando() {
    navigate('/Finalizado');
  }
  return (
    <div>
      <Previsao />
      <div className="Container">
        <div id="cxPerfil">
          <img className="perfil" src={perfil} alt="Perfil" />
        </div>
        <h2 id="nomeUsuario">{localStorage.getItem("nome")}</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={handleAndamento} disabled={false}>
            <div id="iconAndamento">
            <i class="bi bi-clock"></i>
            </div>
            Em andamento
          </button>
          <button id="btnFinalizando" onClick={handleFinalizando} disabled={false}>
            <div id="iconFinalizando">
             
            </div>
            Tarefas finalizadas
          </button>
          <button id="btnSair" onClick={handleSair} disabled={false}>
            <div>
            <i class="bi bi-box-arrow-right"></i>
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
