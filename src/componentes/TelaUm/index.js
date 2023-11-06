import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import axios from 'axios';
import Previsao from "../Previsão";

function TelaUm(){
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {

    const userId = sessionStorage.getItem('usuarioId'); 
    
    if (!userId) {
      console.error('ID do usuário não encontrado na sessão.');
      return;
    }

    //https://mapeamentolixo.onrender.com/posts/concluded-posts/${userId}

    axios.get(`http://localhost:3000/posts/concluded-posts/${userId}`)   
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
      <ul>
      {posts.map((post) => (
        <div key={post._id} className="fotos4">
          <div id="cxLixo">
          <img className="lixo" src={post.image} />
          </div>
          <div id="cxInfo">
          {post.location && (
              <h6 className="localizacoes">Localização: {post.address}</h6>
            )}
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