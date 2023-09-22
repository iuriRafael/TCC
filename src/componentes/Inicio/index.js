import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from 'axios';
// import lixos1 from "../img/e5a09f73b89138f33fd71d18b967fe9c.jpg";
// import lixos2 from "../img/residuo2.jpg";
// import lixos3 from "../img/residuos3.webp";
// import mais from "../img/botoes/mais.png";
import Navbar from "../navbar";
import Previsao from "../Previsão";

function Inicio() {
  const [postagens, setPostagens] = useState([]);
  const navigate = useNavigate();

  const fetchPostagens = () => {
    axios
      .get("http://localhost:3000/posts/list")
      .then((response) => {

        const updatedPostagens = response.data.map((post) => ({
          ...post,
          image: `http://localhost:3000/${post.image}`, // Construa o URL completo da imagem
        }));
        setPostagens(updatedPostagens);
        
        // setPostagens(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar publicações:", error);
      });
  };

  useEffect(() => {
    // Chamando a função de busca de publicações quando o componente é montado
    fetchPostagens();
  }, []);

  function handleClickConcluir() {
    navigate("/Concluir");
  }

  return (
    <div>
      <Previsao />

      {postagens.map((post) => (
        <div key={post._id} className="fotos4">
          <img className="lixo" src={post.image} />
          <h2 className='endereco'>{post.description}</h2>
          <p className='localizacaoss'>{post.location}</p>
          
          {/* Botões embaixo de cada postagem */}
          <div className="botoes-postagem">
            <button className="localizacao">
              Localização
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            </button>
            <button className="concluir" onClick={handleClickConcluir}>
              Concluir
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Inicio;
