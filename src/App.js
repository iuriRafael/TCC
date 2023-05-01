import React from "react";
import './App.css';
import Inicio from "./componentes/Entrada/index";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explicacao from "./componentes/Explicacao";
import Login from "./componentes/Login";


function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/explicacao" element={<Explicacao />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
