import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logos from "../img/default_765x625 2.png";
import axios from 'axios';

const Login = ()=>{
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos do formulário');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3000/Usuario/login',{
        email,
        senha
      });

      if(response.status === 200){
        const { nome } = response.data; 
        console.log('Login realizado com sucesso');
        alert(`Bem-vindo, ${nome}!`);
        navigate('/Inicio');
      }else{
        console.log('Erro ao realizar login:', response.data.error);
      }
    }catch(erro){
      console.error('Erro ao realizar login:', erro);
    }
  };

  function handleClick(){
    navigate('/Cadastro');
  }
  
    return(
        <div className="App">
             <img className="imagens2" src={Logos} />
             <h3 id='frase'>1° APP para mapeamento de resíduos sólidos no mundo</h3>
             <form className='formulario' onSubmit={handleSubmit}>
             
            <input
                type="email"
                placeholder="E-mail:"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Senha:"
                value={senha}
                onChange={handleSenhaChange}
             />
             
            <div className='btns'>
              <button className= "botaoLogin"  disabled={false} type="submit">Login</button>
              <p id='ou'>ou</p>
              <button className="botaoCadastro" onClick={handleClick} disabled={false} type="submit">Cadastro</button>
            </div>
            
         </form>     
    </div>
    )

}

export default Login;