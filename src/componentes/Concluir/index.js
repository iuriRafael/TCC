// import React, { useState } from 'react';
// import './style.css';
// import Logo from "../img/meioo/CleanMap/default_transparent_1000x1000.png";
// import axios from 'axios'; // Importe a biblioteca axios



// function Concluir(props) {
  
//   const postId = props.id;
  

//   const handleConcluirClick = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3000/posts/${postId}/conclude`);
//       console.log(postId);
//       console.log(response.data);
//       // Atualize a interface do usuário ou execute outra ação após concluir o post com sucesso
//     } catch (error) {
//       console.error('Erro ao concluir o post:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleConcluirClick}>Concluir Post</button>
//     </div>
//   );
// }

// export default Concluir;