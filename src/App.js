import React from "react";
import './App.css';
import Entrada from "./componentes/Entrada/index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explicacao from "./componentes/Explicacao";
import Login from "./componentes/Login";
import Cadastro from "./componentes/Cadastro";
import Inicio from "./componentes/Inicio";



function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrada />} />
        <Route path="/explicacao" element={<Explicacao />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Inicio" element={<Inicio/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
