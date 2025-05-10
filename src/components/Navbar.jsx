import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const isLogin = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setIsOpen(false);
    setActiveLink(path);
  };

  const handleProfileAction = () => {
    if (isLogin) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setDropdownOpen(false);
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
            to="/arena"
            className={`nav-link ${activeLink === "/arena" ? "active" : ""}`}
            onClick={() => handleLinkClick("/arena")}
          >
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
        <li style={{ position: "relative" }}>
        <button className="profile-btn" onClick={toggleDropdown}>
          <img
            src="https://raw.githubusercontent.com/Abhiramgopi1/portfolio-assets/refs/heads/main/user-circles-set_78370-4704.avif"
            alt="User Icon"
            className="profile-img"
          />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {isLogin ? (
              <>
                <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className="dropdown-item">
                  View Profile
                </button>
                <button onClick={() => { onLogout(); setDropdownOpen(false); }} className="dropdown-item">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => { navigate("/login"); setDropdownOpen(false); }} className="dropdown-item">
                Login / Signup
              </button>
            )}
          </div>
        )}
      </li>

      </ul>
    </nav>
  );
}

export default Navbar;
