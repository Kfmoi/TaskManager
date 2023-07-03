import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useCookies(["mytoken"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/user/login/", {
        username,
        password,
      });
  
      setToken("mytoken", response.data.token);
      window.localStorage.setItem("userID", response.data.u);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
        <button type="submit" className="login-btn">
          Login
        </button>
        <p>Don't have an account?</p>
        <Link to="/register" className="register">
          Register Now
        </Link>
      </form>
    </div>
  );
};

export default Login;