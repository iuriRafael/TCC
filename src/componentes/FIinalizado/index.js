import React from "react";
import "./finalizado.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import check from "../img/botoes/check.png";
import send from "../img/botoes/send.png";
import remocao from "../img/botoes/loop.png";
import local from "../img/botoes/localizacao.png";

import Previsao from "../Previsão";
function Finalizado() {
  const progress = 2; // Pode variar de 0 a 3 (representando as 4 etapas)

  return (
    <div>
      <Previsao />
      <div className="Container">
        
        <h2 id="nomeUsuario">Tarefas finalizadas</h2>
      </div>

      <div id="fases">
        {/* ... mantenha o restante do código como está ... */}
      </div>
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Finalizado;
