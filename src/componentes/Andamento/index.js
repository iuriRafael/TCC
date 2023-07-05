import React from "react";
import "./andamento.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import lixos2 from "../img/residuo2.jpg"

import Previsao from "../Previsão";

function Andamento() {
  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil}></img>
        <h2 id="nomeUsuario">Andamento</h2>
        <div className='fotos4'>
                <img className="lixo" src={lixos2} />
                <h2 className='endereco'>Av. Pres. Castelo Branco, 488 - Centro, Igrejinha</h2>
             </div>

             <div className="botao-container">
                 <button className="localizacao">Localização</button>
                 <div id="status">
                  <label>Status:</label>
                  <h4>Em remoção</h4>
                 </div>
             </div>
      </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Andamento;
