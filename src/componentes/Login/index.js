import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';
import Logos from '../img/default_765x625 2.png';
import onda from '../img/Captura_de_tela_2023-07-19_210142-removebg-preview/Captura_de_tela_2023-07-19_210142-removebg-preview.png';
import logolat from "../img/Humaaans - 2 Characters.png";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importe o Modal e o Button do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Novo estado para controlar o modal
  const [userName, setUserName] = useState(''); // Novo estado para armazenar o nome do usuário
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

    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:3000/Usuario/login', {
          email,
          senha,
        });

        if (response.status === 200) {
          const { nome } = response.data;
          localStorage.setItem('nome', nome);

          console.log('Login realizado com sucesso');
          setUserName(nome); // Armazena o nome do usuário
          setShowWelcomeModal(true); // Mostra o modal de boas-vindas
          navigate('/Inicio');
        } else {
          console.log('Erro ao realizar login:', response.data.error);
        }
      } catch (erro) {
        console.error('Erro ao realizar login:', erro);
      } finally {
        setLoading(false);
      }
    }, 2500);
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
            type="email"
            placeholder="E-mail:"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <input
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
          <div className="btns">
            {/* Adicionei o spinner ao botão de login */}
            <button className="botaoLogin" type="submit" disabled={!email || !senha || isLoading}>
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Login'
              )}
            </button>
            <p id="ou">ou</p>
            <button className="botaoCadastro" onClick={handleClick} type="button">
              Cadastro
            </button>
          </div>
        </form>
      </div>
      <div id='esquerda' className="wave-border">
      {/* <div className="wave" style={{
              height: '100px',
              width: '200px',
              backgroundImage: `url(${onda})`,
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat',
              animation: 'wave 2s linear infinite',
            }}>
            </div> */}
        <div id='itensEsquerda'>
          <img className="imagens2" id='rot' src={logolat} alt="Logo" />
          <h3 id='titleExp'>Olá! Caso não tenha conta, acesse o botão abaixo.</h3>
          <button className="botaoCadastro2" onClick={handleClick} type="button">
            Cadastro
          </button>
        </div>
      </div>
      {/* Modal de Boas-Vindas */}
      <Modal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bem-vindo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Olá, {userName}! Seja bem-vindo ao nosso aplicativo.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowWelcomeModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
