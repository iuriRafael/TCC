import React from "react";
import "./usuario.css";
import Navbar from "../navbar";
import perfil from "../img/938bdbce6a7bca524f2607d340115145.jpg";

import Previsao from "../Previsão";

function Usuario() {
  return (
    <div>
      <Previsao />
      <div className="Container">
        <img className="perfil" src={perfil}></img>
        <h2>Iuri</h2>

        <div className="user-buttons">
          <button className="preto">Andamento</button>
          <button className="preto">Concluindo</button>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default Usuario;
