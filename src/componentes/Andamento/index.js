import React, { useEffect, useState }from "react";
import "./andamento.css";
import Navbar from "../navbar";
import perfil from "../img/noImage.png";
import lixos2 from "../img/residuo2.jpg"
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
        <div key={publication._id}>
          <img src={publication.image} />

          <p>Descrição: {publication.description}</p>
          <p>Localização: {publication.location}</p>
          
        </div>
      ))}
    </div>

      <Navbar />
      <div id="espaco"></div>
    </div>
  );
}

export default Andamento;
