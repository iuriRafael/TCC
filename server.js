const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req , res)=>{
  res.send("testando o mongo")
});
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
// Conexão com o MongoDB
mongoose.connect('mongodb+srv://cimol:c1i2m3o4l5@cleanmap.eiqipwt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Rotas do servidor
// ...


