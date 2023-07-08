import React from 'react';
import './style.css'
import Logo from "../img/meioo/CleanMap/default_transparent_1000x1000.png";
import Olho from "../img/lixo3.jpg";
import { useNavigate } from 'react-router-dom';

function Concluir(props) {
    const navigate = useNavigate();

    function handleClickConcluir(){
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
            <div className="Logo">
                <img src={Logo} id='imgLogo' />
            </div>
            <label className='labelSenha'>Senha:</label>
            <input type="password" className='inptSenha'>
            </input>
            <svg id='iconOlho' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg>

        </div>
    )
}

export default Concluir;