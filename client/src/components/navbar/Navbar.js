import React from 'react'

import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './navbar.css'

const Navbar = () => {

    const [cookies, setCookies] = useCookies(["mytoken"]);
  const navigate = useNavigate();

    const logout = () => {
        setCookies("mytoken", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("taskIds");
    navigate("/login");
    };

  return (
    <div className="navbar">
      <div className="left">
        {!cookies.mytoken ? (
          <Link to="/login">Login/Register</Link>
        ) : (
          <button onClick={logout} className="logout-btn">Log Out</button>
        )}
      </div>
      <Link to="/">
        Home
      </Link>
    </div>
  );
};


export default Navbar