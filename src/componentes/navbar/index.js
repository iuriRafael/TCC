import React from 'react';
import { NavLink } from 'react-router-dom';

import homeIcon from "../img/casa.png";
import cameraIcon from "../img/simbolo-de-interface-de-camera-fotografica-para-botao.png";
import mapIcon from "../img/mapa.png";
import userIcon from "../img/do-utilizador.png";

import './nav.css';

function Navbar() {
    return (
      <nav className="navbar">
        <NavLink to="/Inicio" activeClassName="active">
          <img src={homeIcon} alt="Home" />
        </NavLink>
        <NavLink to="/camera" activeClassName="active">
          <img src={cameraIcon} alt="Camera" />
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