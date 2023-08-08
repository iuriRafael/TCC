import React from "react";
import "./finalizado.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import check from "../img/botoes/check.png";
import send from "../img/botoes/send.png";
import remocao from "../img/botoes/loop.png";
import local from "../img/botoes/localizacao.png";

import Previsao from "../Previsão";

function OrderProgress({ progress }) {
  return (
    <div id="acompanhamento">
      <div
        className={`item ${progress > 0 ? "active" : ""}`}
        id="item1"
      >
        <img
          className="enviado"
          src={send}
          alt="Enviado"
        />
      </div>
      <div
        className={`item ${progress > 1 ? "active" : ""}`}
        id="item2"
      >
        <img
          className="localizado"
          src={local}
          alt="Localizado"
        />
      </div>
      <div
        className={`item ${progress > 2 ? "active" : ""}`}
        id="item3"
      >
        <img
          className="remocao"
          src={remocao}
          alt="Remoção"
        />
      </div>
      <div
        className={`item ${progress > 3 ? "active" : ""}`}
        id="item4"
      >
        <img
          className="removido"
          src={check}
          alt="Removido"
        />
      </div>
    </div>
  );
}

function Finalizado() {
  const progress = 2; // Pode variar de 0 a 3 (representando as 4 etapas)

  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil} alt="Perfil" />
        <h2 id="nomeUsuario">Tarefas finalizadas</h2>
      </div>
      <OrderProgress progress={progress} /> {/* Adiciona o componente OrderProgress */}
      <div id="fases">
        {/* ... mantenha o restante do código como está ... */}
      </div>
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Finalizado;
