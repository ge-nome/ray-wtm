import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './home';
import Display from './display';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Login from './login';
import UsedContext from './auth/usercontext';
import Dashboard from './dashboard';
import Register from './register';
import Skills from './skills';

function App() {
  return (
    <UsedContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Display />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </BrowserRouter>
    </UsedContext>
  );
}

export default App;
