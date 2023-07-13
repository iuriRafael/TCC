import React from 'react';
import { Carousel } from 'react-bootstrap';
import './style.css';
import Logo from "../img/lixos2.jpg";
import Celular from "../img/Humaaans - Space (1).png";
import Celular2 from "../img/Humaaans - 2 Characters.png";
import Celular3 from "../img/Humaaans - 3 Characters.png";
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
        <Carousel.Item id='car'>
          <div id='cxCelular'>
            <img className='celular' src={Celular} alt="Celular" />
          </div>
          <div className='frases'>
              <p>1º Abra o App no seu celular,<p>
              </p> em seguida abra a câmera do App</p>
            </div>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id='car'>
          <div id='cxCelular'>
            <img className='celular' src={Celular2} alt="Celular" />
          </div>
          <div className='frases'>
              <p>2º Bata uma foto com seu celular.</p>
            </div>
          <Carousel.Caption>
            {/* <div className='frases'>
              <p>2º Bata uma foto com seu celular.</p>
            </div> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id='car'> 
          <div id='cxCelular'>
            <img className='celular' src={Celular3} alt="Celular" />
          </div>
          <div className='frases' id='terceiraFrase'>
              <p>3º Faça a postagem do resíduo!</p>
            </div>
            <div className='cxBtnContinuar'>
              <button className="btnContinuar" onClick={handleClick} disabled={false} type="submit">Continuar</button>
            </div>
          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );
}

export default Explicacao;
