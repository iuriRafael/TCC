import React from 'react';
import './style.css'
import Logo from "../img/meioo/CleanMap/default_transparent_1000x1000.png";
// import Olho from "../img/botoes/olho.png";
// import OlhoF from "../img/botoes/olhos-cruzados.svg";
import { useNavigate } from 'react-router-dom';

function Concluir(props) {
  const navigate = useNavigate();

  function handleClickConcluir() {
    navigate('/')
  }
  const retornar = () => {
    navigate('/Inicio');
  };
  return (
    <div className="container">
      <div id='btnVoltarCont'>
        <button className="btnVoltar" onClick={retornar} disabled={false} type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
          Voltar
        </button>
      </div>
      <div id='restante'>
        <div className="Logo">
          <img src={Logo} id='imgLogo' />
        </div>
        <div className="campoSenha">
          <label className='labelSenha'>Senha:</label>
          <input type="password" className='inptSenha' placeholder='Senha'>
          </input>
        </div>
      </div>
    </div>
  )
}

export default Concluir;