import React from "react";
import "./andamento.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";

import Previsao from "../Previsão";

function Andamento() {
  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil}></img>
        <h2 id="nomeUsuario">Andamento</h2>

      </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Andamento;
