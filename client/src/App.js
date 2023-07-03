import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
