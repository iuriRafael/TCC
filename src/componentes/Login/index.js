import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logos from "../img/default_765x625 2.png";
import axios from "axios";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from '../Loader';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
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
      console.log("Por favor, preencha todos os campos do formulário");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("https://mapeamentolixo.onrender.com/auth/login", {
        email,
        senha,
      }); 
      // const response = await axios.post("https://mapeamentolixo.onrender.com/auth/login", {
      //   email,
      //   senha,
      // });
      if (response.status === 200) {
        const { nome, token, usuario_id, email } = response.data;
        sessionStorage.setItem("nome", nome);
        sessionStorage.setItem("usuarioId", usuario_id);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", email);
        localStorage.setItem("nome", nome);

        setTimeout(() => {
          navigate("/Inicio");
        }, 3000);
      } else {
        console.log("Erro ao realizar login");
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 4000);
      }
    } catch (erro) {
      console.error("Erro ao realizar login");
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2500);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleClick = () => {
    navigate("/Cadastro");
  };

  return (
    <div className="App">
      <div id="formsDireita">
        <img className="imagens2" src={Logos} alt="Logo" />
        <h3 id="frase">1° APP para mapeamento de resíduos sólidos no mundo</h3>
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            className="iptLoginForm"
            type="email"
            placeholder="E-mail:"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            className="iptLoginForm"
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
          <div className="btns">
            <Button
              className="botaoLogin"
              type="submit"
              disabled={isLoading}
              variant="primary"
            >
              {isLoading ? <Loader/> : "Login"}
            </Button>
            <p id="ou">ou</p>
            <button
              className="botaoCadastro"
              id="btnCad"
              onClick={handleClick}
              type="button"
            >
              Cadastro
            </button>
          </div>
        </form>
        {showErrorAlert && (
          <Alert
            variant="danger"
            className="error-alert"
            style={{
              transition: "opacity 0.5s",
              opacity: showErrorAlert ? 1 : 0,
            }}
          >
            Dados de login incorretos. Por favor, verifique suas credenciais.
            <div id="cxX">
              <i class="bi bi-x-circle" style={{ color: "#ff5e5e" , alignItems: 'center' }}></i>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Login;
