import React from "react";
import './App.css';
import Entrada from "./componentes/Entrada/index";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Explicacao from "./componentes/Explicacao";
import Login from "./componentes/Login";
import Cadastro from "./componentes/Cadastro";
import Inicio from "./componentes/Inicio";
import CameraPage from "./componentes/Camera";




function App() {

  // const navigate = useNavigate();

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrada />} />
        <Route path="/explicacao" element={<Explicacao />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Inicio" element={<Inicio/>} />
        <Route path="/Camera" element={<CameraPage />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
