import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Home from "./pages/Home/Home";
import ActivityCreate from "./pages/Activity/ActivityCreate";
import Detail from "./components/Detail/Detail";

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
