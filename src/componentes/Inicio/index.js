import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import lixos1 from "../img/e5a09f73b89138f33fd71d18b967fe9c.jpg";
import lixos2 from "../img/residuo2.jpg"
import lixos3 from "../img/residuos3.webp"
import Navbar from '../navbar';
import Previsao from "../Previsão";

function Inicio(){
    const navigate = useNavigate()
    function handleClickConcluir(){
        navigate('/Concluir');
    }
    return(
        <div>
            <Previsao/>
             <div className='fotos4'>
                <img className="lixo" src={lixos1} />
                <h2 className='endereco'>Rua Ilsa Becker, 04</h2>
             </div>

             <div className="botao-container">
                 <button className="localizacao">Localização</button>
                 <button className="concluir" onClick={handleClickConcluir}>Concluir</button>
             </div>

             <div className='fotos4'>
                <img className="lixo" src={lixos2} />
                <h2 className='endereco'>Av. Pres. Castelo Branco, 488 - Centro, Igrejinha</h2>
             </div>

             <div className="botao-container">
                 <button className="localizacao">Localização</button>
                 <button className="concluir">Concluir</button>
             </div>

             <div className='fotos4'>
                <img className="lixo" src={lixos3} />
                <h2 className='endereco'>Rua 7 de Setembro, 399 - Centro, Igrejinha</h2>
             </div>

             <div className="botao-container">
                 <button className="localizacao">Localização</button>
                 <button className="concluir">Concluir</button>
             </div>

             <Navbar/>    
            <div id='espaco'></div>
        </div>
    )
}

export default Inicio;