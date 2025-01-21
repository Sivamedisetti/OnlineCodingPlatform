import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload , LogOut } from 'lucide-react';
import "./Navbar.css";

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the menu
    navigate(path); // Navigate to the selected path
    setActiveLink(path); // Update the active link
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-toggle" onClick={toggleMenu}>☰</span>
        <Link to="/" className="navbar-tittle" onClick={() => handleLinkClick("/")}> <h1>CodeForge</h1> </Link>
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
            <Upload className="h-4 w-4" />
            <span>Upload Problem</span>
          </Link>
        </li>
        <li>
          <Link to="/login" className={`nav-link ${activeLink === "/login" ? "active" : ""}`} onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
