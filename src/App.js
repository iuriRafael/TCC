import React from "react";
import './App.css';
import Entrada from "./componentes/Entrada/index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explicacao from "./componentes/Explicacao";
import Login from "./componentes/Login";
import Cadastro from "./componentes/Cadastro";
import Inicio from "./componentes/Inicio";
import CameraPage from "./componentes/Camera";
import Usuario from "./componentes/Usuario";
import Mapa from "./componentes/Mapa";
import Finalizado from "./componentes/FIinalizado";
import Andamento from "./componentes/Andamento";

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
        <Route path="/Camera" element={<CameraPage />} />
        <Route path="/Mapa" element={<Mapa/>} />
        <Route path="/Usuario" element={<Usuario />}/>
        <Route path="/Finalizado" element={<Finalizado />}/>
        <Route path="/Andamento" element={<Andamento />}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
