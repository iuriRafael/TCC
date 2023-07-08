import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logos from "../img/default_765x625 2.png";

const Cadastro = () => {
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

    // Verificar se todos os campos foram preenchidos
    if (!nome || !email || !senha || !cep) {
      console.log('Por favor, preencha todos os campos do formulário');
      return;
    }

    // Verificar se o email é válido
    if (!validateEmail(email)) {
      console.log('Email inválido');
      return;
    }

    // Verificar se o email já existe no Local Storage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && storedEmail === email) {
      alert('O email já está cadastrado');
      return;
    }

    // Salvar os valores no Local Storage
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);
    localStorage.setItem('cep', cep);

    // Aqui você pode fazer algo com os valores do formulário, como enviar para o servidor
    console.log('Valores do formulário:', { nome, email, senha, cep });

    // Redirecionar para outra página após o cadastro
    navigate('/Inicio');
  };


  const navigate = useNavigate();

  // Função de validação de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="App">
      <img className="imagens2" src={Logos} alt="Logo" />
      <h3 id='frase'>1° APP para mapeamento de resíduos sólidos no mundo</h3>

      <form className='formulario' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={handleNomeChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={handleSenhaChange}
          required
        />
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={handleCepChange}
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
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
