import React from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';

import homeIcon from "../img/casa.png";
import cameraIcon from "../img/simbolo-de-interface-de-camera-fotografica-para-botao.png";
import mapIcon from "../img/mapa.png";
import userIcon from "../img/do-utilizador.png";

import './nav.css';

function Navbar() {

  const navigate = useNavigate();

  const acessarCamera = () => {
    navigate('/Camera'); // Redirecionar para a página da câmera
  };

    return (
      <nav className="navbar">
        <NavLink to="/Inicio" activeClassName="active">
          <img src={homeIcon} alt="Home" />
        </NavLink>
        <NavLink to="/Camera" activeClassName="active">
        <button onClick={acessarCamera}>
          <img src={cameraIcon} alt="Camera" />
        </button>
        </NavLink>
        <NavLink to="/mapa" activeClassName="active">
          <img src={mapIcon} alt="Mapa" />
        </NavLink>
        <NavLink to="/usuario" activeClassName="active">
          <img src={userIcon} alt="Usuário" />
        </NavLink>
      </nav>
    );
  }
  
  export default Navbar;