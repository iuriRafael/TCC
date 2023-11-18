import React, { useEffect } from 'react';
import { NavLink, useNavigate, } from 'react-router-dom';

import homeIcon from "../img/botoes/casa.png";
import cameraIcon from "../img/botoes/camera-foto.png";
import mapIcon from "../img/botoes/mundo.png";
import userIcon from "../img/botoes/do-utilizador.png";

import './nav.css';

function Navbar() {

  const navigate = useNavigate();

 
  return (
    <nav className="navbar">
      <NavLink to="/Inicio" activeClassName="active">
      <svg id="iconMenu" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path d="m21.743 12.332-9-10c-.379-.422-1.107-.422-1.486 0l-9 10A.998.998 0 0 0 3 14.002h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.997.997 0 0 0 .743-1.67Z"></path>
</svg>
      </NavLink>
      <NavLink to="/Camera" activeClassName="active">
        
        <svg id="iconMenu" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path d="M12 9c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3Z"></path>
     <path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2Zm-8 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5Z"></path>
</svg>
      </NavLink>
      <NavLink to="/Mapa" activeClassName="active">
 
        <svg id="iconMenu" width="40" height="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945"></path>
     <path d="M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 1 0 4 0 2 2 0 0 1 2-2h1.064"></path>
     <path d="M15 20.488V18a2 2 0 0 1 2-2h3.064"></path>
     <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg>
      </NavLink>
      {/* <NavLink to="/Usuario" activeClassName="active">

        <svg id="iconMenu" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
     <path d="M18 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1h12Z"></path>
</svg>      
      </NavLink> */}
    </nav>
  );
}

export default Navbar;