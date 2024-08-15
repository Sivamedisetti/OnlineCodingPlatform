import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Combined click handler
  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the menu
    navigate(path); // Navigate to the selected path
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </span>
        <h1 className="navbar-title">CodeForge</h1>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/arena"
            className="nav-link"
            onClick={() => handleLinkClick("/arena")}
          >
            Coding Arena
          </Link>
        </li>
        <li>
          <Link
            to="/playground"
            className="nav-link"
            onClick={() => handleLinkClick("/playground")}
          >
            Compiler
          </Link>
        </li>
        <li>
          <Link
            to="/uploadProblem"
            className="nav-link"
            onClick={() => handleLinkClick("/uploadProblem")}
          >
            Upload Problem
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
