import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import "./Navbar.css";
import profile from "../assets/profile.svg"
// import {Code2, Upload , LogOut } from 'lucide-react';

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isvisible , setIsvisible] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const islogin = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the menu
    setActiveLink(path); // Update the active link
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-toggle" onClick={toggleMenu}>☰</span>
          <Link to="/" className="navbar-tittle" onClick={() => handleLinkClick("/")}> 
            <h1>CodeForge</h1>
          </Link>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/arena" className={`nav-link ${activeLink === "/arena" ? "active" : ""}`} onClick={() => handleLinkClick("/arena")}>
              <p>Coding Arena</p>
            </Link>
          </li>
          <li>
            <Link
              to="/playground"
              className={`nav-link ${activeLink === "/playground" ? "active" : ""}`}
              onClick={() => handleLinkClick("/playground")}
            >
              <p>Compiler</p>
            </Link>
          </li>
          {/* {
            localStorage.getItem('access') === '"admin"' && 
            <li>
              <Link
                to="/request" className={`nav-link ${activeLink === "/request" ? "active" : ""}`} onClick={() => handleLinkClick("/request")}>
                <p>Request</p>
              </Link>
            </li>
          } */}
          <li>
            <Link
              to="/uploadProblem"
              className={`nav-link ${activeLink === "/uploadProblem" ? "active" : ""}`}
              onClick={() => handleLinkClick("/uploadProblem")}
            >
              <span>Upload Problem</span>
            </Link>
          </li>
          <li>
            <a style={{ textDecoration: 'none', cursor: 'pointer' }} className={!islogin && `nav-link ${activeLink === "" ? "active" : ""}`}>
              {
                islogin ? 
                  <img src={profile} alt="profile" style={{cursor: "pointer"}} onClick={() => {setIsvisible(!isvisible)}}/> : 
                  <span>Login</span>
              }
            </a>
            
          </li>
        </ul>
      </nav>
      {isvisible && (
        <div className="profile-overlay">
          <ul>
            <li className="profile-option">Profile</li>
            <li className="profile-option" onClick={() => {setIsvisible(!isvisible); navigate('/request')}}>Requests</li>
            <li className="profile-option" onClick={() => {setIsvisible(!isvisible); navigate('/users')}}> Users</li>
            <li className="profile-option" onClick={()=> {setIsvisible(!isvisible); islogin ? onLogout() :  navigate('/login')}}>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
