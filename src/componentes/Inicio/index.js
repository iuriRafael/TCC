import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import userIcon from "../img/botoes/do-utilizador.png";
import semConteudo from "../img/botoes/Planet.svg";
import Navbar from "../navbar";
import Previsao from "../Previsão";
import Mapa from "../Mapa";
import "bootstrap-icons/font/bootstrap-icons.css";

function Inicio() {
  const [postagens, setPostagens] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const fetchPostagens = async () => {
    try {
      const response = await axios.get("https://mapeamentolixo.onrender.com/posts/list"); //http://localhost:3000/posts/list
      const postCoordinates = [];

      const updatedPostagens = await Promise.all(
        response.data.map(async (post) => {
          const address = await getReverseGeocoding(post.location.coordinates[1], post.location.coordinates[0]);

          postCoordinates.push({ latitude: post.location.coordinates[1], longitude: post.location.coordinates[0]});

  

          return {
            ...post,
            address,
            image: `https://mapeamentolixo.onrender.com/${post.image}`,
          };
        })
      );

      setPostagens(updatedPostagens);

      // Armazene as coordenadas na sessão
      sessionStorage.setItem("postCoordinates", JSON.stringify(postCoordinates));
    } catch (error) {
      console.error("Erro ao buscar publicações:", error);
    }
  }

  const getReverseGeocoding = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k`);
      const address = response.data.results[0]?.formatted_address;
      return address || "Endereço não encontrado";
    } catch (error) {
      console.error("Erro na obtenção do endereço:", error);
      return "Endereço não encontrado";
    }
  }

  useEffect(() => {
    // Chamando a função de busca de publicações quando o componente é montado
    fetchPostagens();
  }, []);

  function handleClickConcluir(_id) {
    console.log(`ID da publicação: ${_id}`);

    // Verifique o email do usuário logado
    const userEmail = sessionStorage.getItem("email");

    if (userEmail === "kannemann@gmail.com") {

      axios
        .put(`https://mapeamentolixo.onrender.com/posts/${_id}/conclude`) //http://localhost:3000/posts/${_id}/conclude
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Erro ao concluir o post:", error);
        });
    } else {
      console.log("Usuário não autorizado");
      alert("Você não tem permissão para concluir esta publicação");
    }
  }

  return (
    <div>
      <Previsao />
      <div id="cxFiltro">
        <button id="btnFiltro">
          <i class="bi bi-filter-left" ></i>
        </button>
      </div>
      {postagens.length > 0 ? (
        postagens.map((post) => (
          <div key={post._id} className="postagem">
            <div id="fotoPerfil">
              <img src={userIcon} id="userIcon"></img>
              <h6 id="fotoPerfil">{localStorage.getItem("nome")}</h6>
            </div>
            <div id="cxLixo">
              <img className="lixo" src={post.image} />
            </div>
            <div id="cxInformacoes">
              {post.address && (
                <h6 className="localizacoes">
                  Localização: {post.address}
                </h6>
              )}
              <h6 className="endereco">Descrição: {post.description}</h6>
            </div>

            <div className="botoes-postagem">
            <Link to="/Mapa">
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
              </Link>
              {sessionStorage.getItem("email") === "kannemann@gmail.com" && (
                <button
                  className="concluir"
                  onClick={() => handleClickConcluir(post._id)}
                >
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
              )}
            </div>
          </div>
        ))
      ) : (
        <div id="cxTodosItensSem">
          <div id="cxSemConteudo">
            <img src={semConteudo} alt="Imagem Adicional" />
          </div>
          <p>Não há nenhuma postagem no momento.</p>
        </div>
      )}
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Inicio;