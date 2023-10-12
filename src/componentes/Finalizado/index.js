import React, { useState, useEffect }from "react";
import "./finalizado.css";
import Navbar from "../navbar";

import axios from 'axios';
import Previsao from "../Previsão";
function Finalizado() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts/listConcluded')
      .then((response) => {
        const imagemPostagem = response.data.map((post) => ({
          ...post,
          image: `http://localhost:3000/${post.image}`,
        }));
        setPosts(imagemPostagem);
      })
      .catch((error) => {
        console.error('Erro ao buscar as publicações concluídas:', error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="fotos4">
          <div id="cxLixo">
            <img className="lixo" src={post.image} />
          </div>
          <div id="cxInformacoes">
            <h6 className="localizacoes">Localização:{post.location}</h6>
            <h6 className="endereco">Descrição: {post.description}</h6>
          </div>
        </div>
      ))}
      <Navbar />
    </div>
  );
}

export default Finalizado;
