import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import Home from "./pages/home.js"
import Setting from './pages/settings';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Cards from './pages/cards';
import Carts from './pages/carts';
//import { response } from 'express';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/inventory" element={<Cards />}/>
      <Route path="/cart" element={<Carts />}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
