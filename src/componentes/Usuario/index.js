import React from "react";
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
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
        <h2 id="nomeUsuario">Iuri Dutra</h2>

        <div className="user-buttons">
          <button id="btnAndamento" onClick={andamento} disabled={false}>Em andamento</button>
          <button id="btnFinalizado" onClick={handleClick} disabled={false}>Tarefas finalizadas</button>
        </div>
      </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Usuario;
