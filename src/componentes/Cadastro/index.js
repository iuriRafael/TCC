import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logos from "../img/default_765x625 2.png";
import logolat from "../img/Humaaans - Space (1).png"
import axios from 'axios';
import Cookies from 'js-cookie';

const Cadastro = () => {
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

  // Função de validação de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
      console.log('Por favor, preencha todos os campos do formulário');
      return;
    }

    // Verificar se o email é válido
    if (!validateEmail(email)) {
      console.log('Email inválido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/cadastro', {
        nome,
        email,
        senha
      });
      if (response.status === 201) {

        console.log('Usuário cadastrado com sucesso');
        Cookies.set('nome', nome, { expires: 2 });
        Cookies.set('email', email, { expires: 2 });
        sessionStorage.setItem('nome', nome, { expires: 2 });
        sessionStorage.setItem('email', email, { expires: 2 });
        navigate('/Inicio');
      } else {
        console.log('Erro ao cadastrar usuário:', response.data.error);
      }
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro);
    }
  };

  const navigate = useNavigate();

  const retornar = () => {
    navigate('/Login');
  };


  return (
    <div className="App" id='bodyCadastro'>
      <div id='esquerda'>
        <div id='itensEsquerda'>
          <img className="imagens2" src={logolat} alt="Logo"/>
        <h3 id='titleExp'>Olá ! caso já tenha conta acesse o botão abaixo.</h3>
        <button className="botaoLogin" type="submit"  onClick={retornar}>
            Login
          </button>
        </div>
      </div>
      <div id='formsDireita'>
      <img className="imagens2" src={Logos} alt="Logo" />
      <h3 id='frase'>1° APP para mapeamento de resíduos sólidos no mundo</h3>

      <form className='formulario' onSubmit={handleSubmit}>
    
          <input
            className='iptLoginForm'
            type="text"
            placeholder="Nome:"
            value={nome}
            onChange={handleNomeChange}
            required
          />
  
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
     
        <div className='Btns'>
          <button className="btnCadastrar" disabled={false} type="submit">
            Cadastrar
            <svg id='iconContinuar' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
          </button>
          <button className='btnsVoltar' onClick={retornar} disabled={false} type="button">
            Voltar
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Cadastro;