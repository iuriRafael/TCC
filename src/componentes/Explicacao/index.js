import React from 'react';
import { Carousel } from 'react-bootstrap';
import './style.css';
import Logo from "../img/lixos2.jpg";
import Celular from "../img/pngwing.com.png";
import Celular2 from "../img/celular2.avif";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Explicacao(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/Login');
  }

  return (
    <div id='cxTudo'>
      <img className='banner' src={Logo} alt="Banner" />
      <h2>COMO FUNCIONA O CLEANMAP ?</h2>
      <Carousel>
        <Carousel.Item>
        <div id='cxCelular'>
          <img className='celular' src={Celular} alt="Celular" />
          </div>          
          <Carousel.Caption>
            <div className='frases'>
              <p>1º Abra o App no seu celular.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div id='cxCelular'>
          <img className='celular' src={Celular} alt="Celular" />
          </div>
          <Carousel.Caption>
            <div className='frases'>
              <p>1º Abra o App no seu celular.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div id='cxCelular'>
          <img className='celular' src={Celular} alt="Celular" />
          </div>          
          <Carousel.Caption>
            <div className='frases'>
              <p>1º Abra o App no seu celular.</p>
            </div>
            <div className='botão'>
              <button className="btnContinuar" onClick={handleClick} disabled={false} type="submit">Continuar</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );
}

export default Explicacao;
