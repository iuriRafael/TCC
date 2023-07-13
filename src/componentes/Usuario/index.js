import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import { useNavigate } from 'react-router-dom';

import Previsao from "../Previsão";

function Usuario(props) {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchNomeUsuario();
  }, []);

  async function fetchNomeUsuario() {
    try {
      const response = await fetch("http://localhost:3000/Usuario/nomeUsuario");
      const data = await response.json();
      console.log("alguma coisa", data);
      const nomeUsuario = data.nomeUsuario;

      setNomeUsuario(data.nomeUsuario);
    } catch (error) {
      console.error('Erro ao obter o nome do usuário:', error);
    }
  }

  function handleSair() {
    setModalIsOpen(true);
  }

  function handleConfirmarSair() {
    setModalIsOpen(false);
    navigate('/Login');
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
        <img className="perfil" src={perfil} alt="Perfil" />
        <h2 id="nomeUsuario">{localStorage.getItem("nome")}</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={handleAndamento} disabled={false}>
            <div id="iconAndamento">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
            </div>
            Em andamento
          </button>

          <button id="btnFinalizado" onClick={handleClick} disabled={false}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>
            Tarefas finalizadas
          </button>

          <button id="btnSair" onClick={handleSair} disabled={false}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
              </svg>
            </div>
            Sair da conta
          </button>
        </div>
      </div>

      <Navbar />
      <div id="espaco"></div>

      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header>
          <Modal.Title id="pergunta">Tem certeza que deseja sair da conta?</Modal.Title>
        </Modal.Header>
        <Modal.Footer id="btnsModal">
          <Button id="btnCancelar" variant="secondary" onClick={handleCancelarSair}>
            Cancelar
          </Button>
          <Button id="btnConfirmar" variant="primary" onClick={handleConfirmarSair}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Usuario;