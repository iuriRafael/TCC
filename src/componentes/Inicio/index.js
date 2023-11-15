import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import userIcon from "../img/botoes/do-utilizador.png";
import semConteudo from "../img/botoes/Planet.svg";
import Navbar from "../navbar";
import Previsao from "../Previsão";
import Finalizado from "../Finalizado";
import Andamento from "../Andamento";
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
    console.log("Chamando a função fetchPostagens");
    try {
      const response = await axios.get(
        "https://mapeamentolixo.onrender.com/posts/list"
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

  const askForLocationPermission = async () => {
    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      if (status.state === 'granted') {
        console.log('Permissão de localização já concedida');
      } else if (status.state === 'prompt') {
        await navigator.geolocation.getCurrentPosition(() => {
          console.log('Permissão de localização concedida pelo usuário');
        });
      } else {
        console.log('Permissão de localização negada pelo usuário');
      }
    } catch (error) {
      console.error('Erro ao verificar permissão de localização:', error);
    }
  };

  const askForCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Permissão de câmera concedida');
      // Agora você pode usar o stream da câmera, se necessário
    } catch (error) {
      console.error('Erro ao solicitar permissão de câmera:', error);
    }
  };

  const handleClickConcluir = async (_id) => {
    
    console.log(`ID da publicação: ${_id}`);

    try {
      const response = await axios.put(
        `https://mapeamentolixo.onrender.com/posts/${_id}/conclude`
      );

      console.log(response.data);

      // Envia a notificação para o usuário que fez a postagem
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Post Concluída', {
              body: `Sua postagem com ID ${_id} foi concluída!`,
            });
          }
        });
      }
    } catch (error) {
      console.error("Erro ao concluir o post:", error);
    }
  };



  useEffect(() => {
    askForLocationPermission();
    askForCameraPermission();
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
                        class="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </button>
                  </Link>
                  {sessionStorage.getItem("email") ===
                    "kannemann@gmail.com" && (
                    <button
                      className="concluir"
                      onClick={() => handleClickConcluir(post._id, sessionStorage.getItem("email"))}
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
        </div>
      )}
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Inicio;
