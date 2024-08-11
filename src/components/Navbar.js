import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the Navbar CSS file for styling
import UploadProblem from './CodingArena/UploadProblem';

function Navbar() {
  const [view, setView] = useState("list"); // 'list', 'detail', 'upload';

  return (
    <nav className="navbar">
      <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to="/arena">Coding Arena</Link></li>
        <li><Link to="/playground">Compiler</Link></li>
        {/* <button onClick={() => setView("upload")}>Upload Problem</button> */}
        <li><Link to="/uploadProblem">Upload Problem</Link></li>

        {/* <li><Link to="/battleground">Coding Battleground</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
