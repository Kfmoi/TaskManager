import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";



const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/register", {
        username,
        password,
      });
      setAlertClass("success");
      alert("User created");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setAlertClass("error");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <p>Have an account?</p>
        <Link to="/login" className="register">
          Login Now
        </Link>
      </form>
      {alertClass && (
        <div className={`alert ${alertClass}`}>
          {alertClass === "success" ? "User created" : "Registration failed"}
        </div>
      )}
    </div>
  );
};

export default Register;