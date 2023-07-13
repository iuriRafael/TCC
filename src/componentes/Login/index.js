import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logos from '../img/default_765x625 2.png';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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

    try {
      const response = await axios.post('http://localhost:3000/Usuario/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        const { nome } = response.data;
        localStorage.setItem('nome', nome);

        console.log('Login realizado com sucesso');
        setShowWelcomeModal(true); // Exibe o modal de boas-vindas
        navigate('/Inicio');
      } else {
        console.log('Erro ao realizar login:', response.data.error);
      }
    } catch (erro) {
      console.error('Erro ao realizar login:', erro);
    }
  };

  const handleClick = () => {
    navigate('/Cadastro');
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div className="App">
      <img className="imagens2" src={Logos} alt="Logo" />
      <h3 id="frase">1° APP para mapeamento de resíduos sólidos no mundo</h3>
      <form className="formulario" onSubmit={handleSubmit}>
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

        <div className="btns">
          <button className="botaoLogin" type="submit" disabled={!email || !senha}>
            Login
          </button>
          <p id="ou">ou</p>
          <button className="botaoCadastro" onClick={handleClick} type="button">
            Cadastro
          </button>
        </div>
      </form>

      {/* Modal de boas-vindas */}
      <Modal show={showWelcomeModal} onHide={handleCloseWelcomeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Boas-vindas!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bem-vindo ao nosso aplicativo! Você fez login com sucesso.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseWelcomeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
