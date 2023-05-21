import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logos from "../img/default_765x625 2.png";

const Login = ()=>{
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
 

const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode fazer algo com os valores do formulário, como enviar para o servidor
    console.log('Valores do formulário:', { nome, email, senha });
  };

  function handleClick(){
    navigate('/Cadastro');
  }
  function handleClicks(){
    navigate('./Inicio');
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
             
            <div className='Botões'>
              <button className= "botão1" onClick={handleClicks} disabled={false} type="submit">Login</button>
              <button className="botão1" onClick={handleClick} disabled={false} type="submit">Cadastro</button>
            </div>
            
         </form>     
    </div>
    )

}

export default Login;