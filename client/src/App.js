import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import ActivityCreate from "./components/ActivityCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/countries" element={<Home />} />
        <Route path="/activity" element={<ActivityCreate />} />
        <Route path="/countries/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
