import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import axios from 'axios';

function TelaUm(){
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const userId = sessionStorage.getItem('usuarioId');

    if (!userId) {
      console.error('ID do usuário não encontrado na sessão.');
      return;
    }

    async function fetchConcludedPosts() {
      try {
        const response = await axios.get(`http://localhost:3000/posts/concluded-posts/${userId}`);
        const data = response.data;

        const Postagens = response.data.map((post) => ({
          ...post,
          image: `http://localhost:3000/${post.image}`,
        }));
  
        setPosts(Postagens);
      } catch (error) {
        console.error(error);
      }
    }

    fetchConcludedPosts();
  }, []);

  return (
    <div>
      <h2>Publicações concluídas</h2>
      <ul>
      {posts.map((post) => (
        <div key={post._id} className="fotos4">
          <div id="cxLixo">
            <img className="lixo" src={post.image} />
          </div>
          <div id="cxInfo">
            <h6 className="localizacoes">Localização:{post.location}</h6>
            <h6 className="endereco">Descrição: {post.description}</h6>
          </div>
        </div>
      ))}
      </ul>
      <Navbar />
    </div>
  );
}
export default TelaUm;