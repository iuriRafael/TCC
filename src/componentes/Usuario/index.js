import React from "react";
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import finalizado from "../img/botoes/relogio.png";
import andamentos from "../img/botoes/verificacao-da-lista-da-area-de-transferencia.png";
import { useNavigate } from 'react-router-dom';

import Previsao from "../Previsão";

function Usuario(props) {
  const navigate = useNavigate();

  function handleClick(){
    navigate('/Finalizado')
  }
  function andamento(){
    navigate('/Andamento')
  }
  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil}></img>
        <h2 id="nomeUsuario">VALENTINA</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={andamento} disabled={false}>
          <div id="iconAndamento">
            <img className="iconFinal" src={finalizado}></img>
            </div>
            Em andamento
            </button>
            
          <button id="btnFinalizado" onClick={handleClick} disabled={false}>
            <div>
            <img className="iconAndamento" src={andamentos}></img>
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
