import React, { useState, useEffect } from "react";
import "./finalizado.css";
import Navbar from "../navbar";
import semConteudo from "../img/botoes/PlanetDesaturado.svg";
import axios from "axios";
import Previsao from "../Previsão";
import userIcon from "../img/botoes/do-utilizador.png";


function Finalizado() {
  const [posts, setPosts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("opcao1");


  useEffect(() => {

    const userId = sessionStorage.getItem('usuarioId'); 
    
    if (!userId) {
      console.error('ID do usuário não encontrado na sessão.');
      return;
    }

    axios
      .get(`https://mapeamentolixo.onrender.com/posts/listConcluded`)  //http://localhost:3000/posts/listConcluded
      .then(async (response) => {
        const Postagens = await Promise.all(
          response.data.map(async (post) => {
            const address = await getReverseGeocoding(
              post.location.coordinates[1],
              post.location.coordinates[0]
            );
            return {
              ...post,
              address,
              image: `https://mapeamentolixo.onrender.com/${post.image}`, 
              //https://mapeamentolixo.onrender.com/${post.image}
            };
          })
        );
        setPosts(Postagens);
      })
      .catch((error) => {
        console.error("Erro ao buscar as publicações do usuário:", error);
      });
  }, []);

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


  return (
    <div>
      {/* <Previsao /> */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="postagemC">
            <div id="fotoPerfil">
              <img src={userIcon} id="userIcon"></img>
            </div>
            <div id="cxLixo">
              <img className="lixo" src={post.image} />
            </div>
            <div id="cxInformacoes">
              {post.location && (
                <h6 className="localizacoes">
                  Localização: {post.address}
                </h6>
              )}
              <h6 className="endereco">Descrição: {post.description}</h6>
            </div>
          </div>
        ))
      ) : (
        <div id="cxTodosItensSem">
          <p>Não há postes concluídos no momento.</p>
          <div id="cxSemConteudo">
            <img src={semConteudo} alt="Imagem Adicional" />
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}

export default Finalizado;