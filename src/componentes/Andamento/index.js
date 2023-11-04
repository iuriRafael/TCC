import React, { useEffect, useState }from "react";
import "./andamento.css";
import Navbar from "../navbar";
import semConteudo from "../img/botoes/PlanetDesaturado.svg";
import userIcon from "../img/botoes/do-utilizador.png";
import Previsao from "../Previsão";
import axios from 'axios';

function Andamento() {
  const [publications, setPublicacao] = useState([]);
  const [user, setUser] = useState({});

  

  useEffect(() => {

    const userId = sessionStorage.getItem('usuarioId'); 
    
    if (!userId) {
      console.error('ID do usuário não encontrado na sessão.');
      return;
    }

    //http://localhost:3000/posts/user/${userId}
    axios
      .get(`https://mapeamentolixo.onrender.com/posts/user/${userId}`) 
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
              image: post.image, //https://mapeamentolixo.onrender.com/${post.image}
            };
          })
        );
        setPublicacao(Postagens);
        setUser(user.name);
        
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
      <div>
        {publications.length > 0 ? (
          publications.map((publication) => (
            <div key={publication._id} className="postagem">
              <div id="fotoPerfil">
            
              </div>
              <div id="cxLixo">
                <img className="lixo" src={publication.image} alt="Imagem" />
              </div>
              <div id="cxInfo">
                {publication.location && (
                  <h6 className="localizacoes">Localização: {publication.address}</h6>
                )}
                <h6 className="endereco">Descrição: {publication.description}</h6>
              </div>
            </div>
          ))
        ) : (
          <div id="cxTodosItensSem">
            <div id="cxSemConteudo">
              <img src={semConteudo} alt="Imagem Adicional" />
            </div>
            <p>Não há postes pendentes no momento.</p>
          </div>
        )}
      </div>
      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Andamento;
