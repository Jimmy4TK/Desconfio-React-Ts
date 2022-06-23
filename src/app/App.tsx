import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Welcome from "../welcome/Welcome";
import LoginMenu from '../user/LoginMenu';
import NavBarMenu from "../menu/Navbar";
import Info from '../info/Info'
import Password from '../user/Password';
import GameMenu from '../gamemenu/GameMenu';
import Queue from '../gamemenu/Queue';
import { StateLoggedInRoute } from '../common/components/LoggedInRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
              <NavBarMenu />
              <Routes>    
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<LoginMenu />} />
                <Route path="/register" element={<LoginMenu />} />
                <Route path="/info" element={<StateLoggedInRoute component={Info} />} />
                <Route path="/password" element={<StateLoggedInRoute component={Password} />} />

                <Route path="/menu" element={<GameMenu />} />
                <Route path="/queue" element={<Queue />} />
              </Routes>
      <Outlet />
    </BrowserRouter >
  );
}

