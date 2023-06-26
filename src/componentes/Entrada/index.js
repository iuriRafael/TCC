import React from 'react';
import './style.css'
import Logo from "../img/lixos2.jpg";
import Igrejinha from "../img/lixo3.jpg";
import { useNavigate } from 'react-router-dom';

function Inicio(props){
  const navigate=useNavigate();

  function handleClick(){
    navigate('/explicacao');
  }

    return(
      <div className="container">
           <img className="imagem" src={Logo} />
          <div className="titulo">
            <h2>CLEAN MAP</h2>
            <p>Bem-vindo(a)</p>
            <p>APOIO INSTITUCIONAL</p>
            <div className='botão'> 
             <button className="btnContinuar" onClick={handleClick} disabled={false} type="submit">Conhecer Mais</button>
          </div>
          </div>
           <img className='imagem2' src={Igrejinha}/>
          
      </div>


    )
}

export default Inicio