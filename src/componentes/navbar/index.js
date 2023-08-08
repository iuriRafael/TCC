import React, { useEffect } from 'react';
import { NavLink, useNavigate, } from 'react-router-dom';

import homeIcon from "../img/botoes/casa.png";
import cameraIcon from "../img/botoes/camera-foto.png";
import mapIcon from "../img/botoes/mundo.png";
import userIcon from "../img/botoes/do-utilizador.png";

import './nav.css';

function Navbar() {

  const navigate = useNavigate();

  const acessarCamera = () => {
    navigate('/Camera'); // Redirecionar para a página da câmera
  };

  const acessarUsuario = () => {
    navigate('/Usuario');
  }

  const acessarMapa = () => {
    navigate('/Mapa')
  }

  return (
    <nav className="navbar">
      <NavLink to="/Inicio" activeClassName="active">
        <img src={homeIcon} className='icones' alt="Home" />
      </NavLink>
      <NavLink to="/Camera" activeClassName="active">
        <button onClick={acessarCamera}>
          <img src={cameraIcon} className='icones' alt="Camera" />
        </button>
      </NavLink>
      <NavLink to="/Mapa" activeClassName="active">
        <button onClick={acessarMapa}>
          <img src={mapIcon} className='icones' alt="Mapa" />
        </button>
      </NavLink>
      <NavLink to="/Usuario" activeClassName="active">
        <button onClick={acessarUsuario}>
          <img src={userIcon} className='icones' alt="Usuario" />
        </button>
      </NavLink>
    </nav>
  );
}

export default Navbar;