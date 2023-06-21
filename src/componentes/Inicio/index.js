import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import lixos1 from "../img/itemImg.png";
import Navbar from '../navbar';
import Previsao from "../Previsão";

function Inicio(){

    return(
        <div>
            <Previsao/>
             <div className='fotos4'>
                <img className="lixo" src={lixos1} />
                <h2 className='escrever'>Rua Ilsa Becker 04</h2>
             </div>

             <div className="botao-container">
                 <button className="botao">Localização</button>
                 <button className="botao">Concluir</button>
             </div>

             <div className='fotos4'>
                <img className="lixo" src={lixos1} />
                <h2 className='escrever'>Rua Ilsa Becker 04</h2>
             </div>

             <div className="botao-container">
                 <button className="botao">Localização</button>
                 <button className="botao">Concluir</button>
             </div>

             <div className='fotos4'>
                <img className="lixo" src={lixos1} />
                <h2 className='escrever'>Rua Ilsa Becker 04</h2>
             </div>

             <div className="botao-container">
                 <button className="botao">Localização</button>
                 <button className="botao">Concluir</button>
             </div>

             

             <Navbar/>

            
             
        </div>
    )
}

export default Inicio;