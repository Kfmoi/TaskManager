import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { Navbar } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
    <div className="App">

        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>

    </div>
    </Router>
  );
}

export default App;
