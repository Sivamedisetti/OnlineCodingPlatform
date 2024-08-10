import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the Navbar CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to="/arena">Coding Arena</Link></li>
        <li><Link to="/playground">Coding Playground</Link></li>
        {/* <li><Link to="/battleground">Coding Battleground</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
