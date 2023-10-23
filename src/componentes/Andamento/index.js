import React, { useEffect, useState }from "react";
import "./andamento.css";
import Navbar from "../navbar";
import userIcon from "../img/botoes/do-utilizador.png";
import Previsao from "../Previsão";
import axios from 'axios';

function Andamento() {
  const [publications, setPublicacao] = useState([]);

  useEffect(() => {

    const userId = sessionStorage.getItem('usuarioId'); 
    
    if (!userId) {
      console.error('ID do usuário não encontrado na sessão.');
      return;
    }

    axios.get(`http://localhost:3000/posts/user/${userId}`)
      .then((response) => {

        const Postagens = response.data.map((post) => ({
          ...post,
          image: `http://localhost:3000/${post.image}`, 

      }));
      setPublicacao(Postagens);
    })
      .catch((error) => {
        console.error('Erro ao buscar as publicações do usuário:', error);
      });
  }, []);


  return (
    <div>
      <Previsao />
      <div>
    
      {publications.map((publication) => (
        <div key={publication._id} className="postagem">
          <div id="fotoPerfil">
              <img src={userIcon} id="userIcon"></img>
              <h6 id="nomeUser"></h6>
            </div>
          <div id="cxLixo">
            <img className="lixo" src={publication.image} />
          </div>
          <div id="cxInfo">
          {publication.location && (
              <h6 className="localizacoes">Localização: {publication.location.coordinates}</h6>
            )}
            <h6 className="endereco">Descrição: {publication.description}</h6>
          </div>
        </div>
      ))}
    </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Andamento;
