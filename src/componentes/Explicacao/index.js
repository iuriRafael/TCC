import React from 'react';
import './style.css';
import Logo from "../img/lixos2.jpg";
import Celular from "../img/pngwing.com.png";
import { useNavigate } from 'react-router-dom';

function Explicacao(props) {
  const navigate=useNavigate();

  function handleClick(){
    navigate('/Login');
  }
    return (
      <div id='cxTudo'>
        <img className='banner' src={Logo}></img>
        <div className='container'>
          <h2>COMO FUNCIONA O CLEANMAP ?</h2>
          <img className='celular' src={Celular}></img>
          <p id='fraseExplicacao'>1º Abra o App no seu celular.</p>
        </div>

        <div className='botão'> 
             <button className="btnContinuar" onClick={handleClick} disabled={false} type="submit">Continuar</button>
          </div>
      
      </div>
    );
  }
  
export default Explicacao;