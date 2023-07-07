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
      <div id="item">
        <img
          className={`enviado ${progress > 0 ? "active" : ""}`}
          src={send}
          alt="Enviado"
        />
      </div>
      <div id="item2">
        <img
          className={`localizado ${progress > 1 ? "active" : ""}`}
          src={local}
          alt="Localizado"
        />
      </div>
      <div id="item3">
        <img
          className={`remocao ${progress > 2 ? "active" : ""}`}
          src={remocao}
          alt="Remoção"
        />
      </div>
      <div id="item4">
        <img
          className={`removido ${progress > 3 ? "active" : ""}`}
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
        <div className={`fase ${progress > 0 ? "active" : ""}`}>
          <h5>Postagem enviada</h5>
        </div>
        <div className={`fase2 ${progress > 1 ? "active" : ""}`}>
          <h5>Resíduo confirmado!</h5>
        </div>
        <div className={`fase3 ${progress > 2 ? "active" : ""}`}>
          <h5>Em remoção</h5>
        </div>
        <div className={`fase4 ${progress > 3 ? "active" : ""}`}>
          <h5>Resíduo removido</h5>
        </div>
      </div>
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Finalizado;
