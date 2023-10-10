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
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  const [showLoadingModal, setShowLoadingModal] = useState(false); // Estado para controlar a exibição do modal de loading
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

    // Ative a animação de loading e exiba o modal de loading
    setIsLoading(true);
    setShowLoadingModal(true);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        senha,
      });

      console.log('Resposta do servidor:', response.data);
      
      if (response.status === 200) {
        const { nome, token, usuario_id, email} = response.data;

        // Armazenar informações na sessão (session storage)
        sessionStorage.setItem('nome', nome);
        sessionStorage.setItem('usuarioId', usuario_id);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
        localStorage.setItem("nome",nome)

        console.log('Login realizado com sucesso');
        // Use setTimeout para navegar para a próxima tela após 3 segundos
        setTimeout(() => {
          navigate('/Inicio');
        }, 3000);
      } else {
        console.log('Erro ao realizar login:');
      }
    } catch (erro) {
      console.error('Erro ao realizar login:');
    } finally {
      // Desative a animação de loading e feche o modal após 3 segundos
      setTimeout(() => {
        setIsLoading(false);
        setShowLoadingModal(false);
      }, 2000);
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
            <button className="botaoLogin" type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Login'}
            </button>
            <p id="ou">ou</p>
            <button className="botaoCadastro" id='btnCad' onClick={handleClick} type="button">
              Cadastro
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Loading */}
      <Modal show={showLoadingModal} backdrop="static" keyboard={false} centered>
        <Modal.Body>
          <div className="text-center">
            <h4>Renderizando [ ... ]</h4>
            <div className="spinner-border" role="status">
              
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
