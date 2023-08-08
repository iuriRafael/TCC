import React from 'react';
import './style.css'
import Logo from "../img/lixos2.jpg";
import Igrejinha from "../img/lixo3.jpg";
import { useNavigate } from 'react-router-dom';

function Entrada(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/Explicacao');
  }

  function handleClickLogin() {
    navigate('/Login');
  }

  return (
    <body id='bodyEntrada'>

    <div className="container">
      <img className="imagem" src={Logo} />
      <div className="titulo">
        <h2>CLEANMAP</h2>
        <p>Bem-vindo(a)</p>
        <p>APOIO INSTITUCIONAL</p>
        <div className='conhecer'>
          <button className="btnConhecerMais" onClick={handleClick} disabled={false} type="submit">
            Conhecer Mais
          </button>
        </div>
        <p className='ou'>ou</p>
        <div className='logar'>
          <button className="btnLogar" onClick={handleClickLogin} disabled={false} type="submit">
            Logar
          </button>
        </div>
      </div>
    </div>
    </body>
  )
}

export default Entrada;