import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logos from '../img/default_765x625 2.png';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importe o Modal e o Button do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
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
      console.log('Por favor, preencha todos os campos do formulário');
      return;
    }

      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email,
          senha,
        });

        if (response.status === 200) {
          const { nome, token, usuario_id} = response.data;

      // Armazenar informações na sessão (session storage)
      sessionStorage.setItem('nome', nome);
      sessionStorage.setItem('usuarioId', usuario_id);
      sessionStorage.setItem('token', token);

          console.log('Login realizado com sucesso');
          navigate('/Inicio');
        } else {
          console.log('Erro ao realizar login:');
        }
      } catch (erro) {
        console.error('Erro ao realizar login:');
      } 
  };

  const handleClick = () => {
    navigate('/Cadastro');
  };

  return (
    <div className="App">
      <div id='formsDireita'>
        <img className="imagens2" src={Logos} alt="Logo" />
        <h3 id="frase">1° APP para mapeamento de resíduos sólidos no mundo</h3>
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            className='iptLoginForm'
            type="email"
            placeholder="E-mail:"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <input
            className='iptLoginForm'
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
          <div className="btns">
            {/* Adicionei o spinner ao botão de login */}
            <button className="botaoLogin" type="submit">
              login
            </button>
            <p id="ou">ou</p>
            <button className="botaoCadastro" id='btnCad' onClick={handleClick} type="button">
              Cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
