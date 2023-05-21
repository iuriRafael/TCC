import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logos from "../img/default_765x625 2.png";

const Cadastro = ()=>{

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');
  
  const handleNomeChange = (event) => {
      setNome(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSenhaChange = (event) => {
      setSenha(event.target.value);
    };
  
    const handleCepChange = (event) => {
      setCep(event.target.value);
    };
  
  const handleSubmit = (event) => {
      event.preventDefault();
      // Aqui você pode fazer algo com os valores do formulário, como enviar para o servidor
      console.log('Valores do formulário:', { nome, email, senha, cep });
    };

    function handleClick(){
        navigate('/Inicio');
      }

    const navigate=useNavigate();
    
    
    return(
        <div className="App">
            <img className="imagens2" src={Logos} />
             <h3>1° APP para mapeamento de resíduos sólidos no mundo</h3>

             <form className='formulario' onSubmit={handleSubmit}>
             <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={handleNomeChange}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={handleSenhaChange}
             />
             <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={handleCepChange}
            />
            <div className='Botões'>
              <button className="botão1" onClick={handleClick} disabled={false} type="submit">Cadastrar</button>
            </div>   
         </form>  

        </div>


    )

}

export default Cadastro;