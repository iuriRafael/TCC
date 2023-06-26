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
    return (
        <div>
            <Previsao />
            <div className="Container">
                <img className="perfil" src={perfil}></img>
                <h2 id="nomeUsuario">Tarefas finalizadas</h2>
            </div>
            <div id="acompanhamento">
                <div id="item">
                    <img className="enviado" src={send}></img>
                </div>
                <div id="item2">
                    <img className="localizado" src={local}></img>
                </div>
                <div id="item3">
                    <img className="remocao" src={remocao}></img>
                </div>
                <div id="item4">
                    <img className="removido" src={check}></img>
                </div>
            </div>
            <div id="fases">
                <div className="fase">
                    <h5>Postagem enviada</h5>
                </div>
                <div className="fase2">
                    <h5>Resíduo confirmado!</h5>
                </div>
                <div className="fase3">
                    <h5>Em remoção</h5>
                </div>
                <div className="fase4">
                    <h5>Resíduo removido</h5>
                </div>
            </div>
            <Navbar />
            <div id="espaco"></div>
        </div>
    );
}

export default Finalizado;
