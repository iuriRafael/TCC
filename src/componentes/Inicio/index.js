import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import lixos1 from "../img/itemImg.png";

function Inicio(){
    

    return(
        <div>
            <div className='tudo'>
                <div className='Previsão'>
                    <div className='marco'>
                    <h2>22°C</h2>
                     <h3>Igrejinha</h3>
                    </div>  
                </div>
             </div>

             <div className='fotos4'>
                <img className="lixo" src={lixos1} />
                <h2 className='escrever'>Rua Ilsa Becker 04</h2>
             </div>

             <div className="botao-container">
                 <button className="botao">Localização</button>
                 <button className="botao">Concluir</button>
             </div>

            
             
        </div>
    )
}

export default Inicio;