
import React from 'react';
import './style.css';
import Logo from "../img/lixos2.jpg";
import Celular from "../img/celular.png";
import { useNavigate } from 'react-router-dom';


function Explicacao(props) {
  const navigate=useNavigate();

  function handleClick(){
    navigate('/Login');
  }
    return (
      <div>
        <img className='imagens' src={Logo}></img>
        <div className='container'>
          <h2>COMO FUNCIONA</h2>
          <img className='celular' src={Celular}></img>
          <p>1. Abra no seu celular o app</p>
        </div>

        <div className='botão'> 
             <button className="meu-botao" onClick={handleClick} disabled={false} type="submit">Conhecer Mais</button>
          </div>
        

      </div>
    );
  }
  
export default Explicacao;