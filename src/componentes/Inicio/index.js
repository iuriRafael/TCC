import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import userIcon from "../img/botoes/do-utilizador.png";
import semConteudo from "../img/botoes/Planet.svg";
import Navbar from "../navbar";
import Previsao from "../Previsão";
import Finalizado from '../Finalizado';
import Andamento from '../Andamento';
import TelaUm from "../TelaUm";
import Mapa from "../Mapa";
import "bootstrap-icons/font/bootstrap-icons.css";



function Inicio() {
  const [postagens, setPostagens] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("opcao0");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const fetchPostagens = async () => {
    console.log("Chamando a função fetchPostagens")
    try {
      const response = await axios.get(
        "http://localhost:3000/posts/list"
        //https://mapeamentolixo.onrender.com/posts/list
      ); 
      const postCoordinates = [];
      // console.log(response);
      const updatedPostagens = await Promise.all(
        response.data.map(async (post) => {
          const address = await getReverseGeocoding(
            post.location.coordinates[1],
            post.location.coordinates[0]
          );

          postCoordinates.push({
            latitude: post.location.coordinates[1],
            longitude: post.location.coordinates[0],
          });

          return {
            ...post,
            address,
            image: post.image, //https://mapeamentolixo.onrender.com/${post.image}

          };
        })
      );

      setPostagens(updatedPostagens);

      sessionStorage.setItem(
        "postCoordinates",
        JSON.stringify(postCoordinates)
      );
    } catch (error) {
      console.error("Erro ao buscar publicações:", error);
    }
  };

  const getReverseGeocoding = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k`
      );
      const address = response.data.results[0]?.formatted_address;
      return address || "Endereço não encontrado";
    } catch (error) {
      console.error("Erro na obtenção do endereço:", error);
      return "Endereço não encontrado";
    }
  };

  const handleClickConcluir = (_id) => {
    console.log(`ID da publicação: ${_id}`);
    const userEmail = sessionStorage.getItem("email");

    if (userEmail === "kannemann@gmail.com") {
      axios
        .put(`http://localhost:3000/posts/${_id}/conclude`)
        
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
  };

  useEffect(() => {
    fetchPostagens();
  }, [selectedOption]);
  
  

  return (
    <div>
      <Previsao />
      <div id="cxFiltro">
        <button id="btnFiltro" onClick={() => setShowFilter(!showFilter)}>
          <i className="bi bi-filter-left"></i>
        </button>
        {showFilter && (
          <div>
            <select
              id="filterOptions"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option className="optionPost" value="opcao0">
                Todos as postagem
              </option>
              <option className="optionPost" value="opcao1">
                Todas as postagem concluinda
              </option>
              <option className="optionPost" value="opcao2">
                Suas Postagem Pendentes ainda
              </option>
              <option className="optionPost" value="opcao3">
                Suas postagens Concluídos
              </option>
              
            </select>
          </div>
        )}
      </div>
      {selectedOption === "opcao1" && <Finalizado />}
      {selectedOption === "opcao2" && <Andamento />}
      {selectedOption === "opcao3" && <TelaUm />}

    {selectedOption === "opcao0" && (
      <div>
        {postagens.length > 0 ? (
          postagens.map((post) => (
            <div key={post._id} className="postagem">
              {/* Render the common elements for all posts */}
              <div id="fotoPerfil">
                {/* Render user profile image here */}
              </div>
              <div id="cxLixo">
                <img className="lixo" src={post.image} alt="Lixo" />
              </div>
              <div id="cxInformacoes">
                {post.address && (
                  <h6 className="localizacoes">Localização: {post.address}</h6>
                )}
                <h6 className="endereco">Descrição: {post.description}</h6>
              </div>
              <div className="botoes-postagem">
                <Link to="/Mapa">
                  <button className="localizacao">
                    Localização
                    {/* Render location icon here */}
                  </button>
                </Link>
                {sessionStorage.getItem("email") === "kannemann@gmail.com" && (
                  <button
                    className="concluir"
                    onClick={() => handleClickConcluir(post._id)}
                  >
                    Concluir
                    {/* Render concluir icon here */}
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
      </div>
    )}
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Inicio;