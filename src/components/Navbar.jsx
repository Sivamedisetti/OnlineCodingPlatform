import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import {Code2, Upload , LogOut } from 'lucide-react';

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the menu
    setActiveLink(path); // Update the active link
  };

  return (
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
          <a style={{ textDecoration: 'none', cursor: 'pointer' }} className={`nav-link ${activeLink === "" ? "active" : ""}`} onClick={onLogout}>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
