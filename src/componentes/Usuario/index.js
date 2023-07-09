import React, { useEffect, useState } from "react";
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import finalizado from "../img/botoes/relogio.png";
import andamentos from "../img/botoes/verificacao-da-lista-da-area-de-transferencia.png";
import { useNavigate } from 'react-router-dom';

import Previsao from "../Previsão";

function Usuario(props) {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    // Chamar uma função assíncrona que busca o nome do usuário logado
    fetchNomeUsuario();
  }, []);

  async function fetchNomeUsuario() {
    try {
      // Fazer uma chamada para a API para obter o nome do usuário logado
      const response = await fetch("http://localhost:3000/Usuario/nomeUsuario");
      const data = await response.json();
      const nomeUsuario = data.nomeUsuario;

      setNomeUsuario(nomeUsuario);
    } catch (error) {
      console.error('Erro ao obter o nome do usuário:', error);
    }
  }

  function handleClick() {
    navigate('/Finalizado');
  }

  function andamento() {
    navigate('/Andamento');
  }

  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil} alt="Perfil" />
        <h2 id="nomeUsuario">Nome do user{nomeUsuario}</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={andamento} disabled={false}>
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
        </div>
      </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Usuario;
