import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Playground from './components/CodingPlayground/Playground';
import Arena from './components/CodingArena/Arena';
import ProblemDetail from './components/CodingArena/ProblemDetail';
import UploadProblem from './components/CodingArena/UploadProblem';
import './styles/variables.css'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/problemDetail" element={<ProblemDetail />} />
          <Route path="/uploadProblem" element={<UploadProblem />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>
          <span className="outline">Welcome</span> to CodeForge
        </h1>
        <p className="welcome-text">Select a section from the navigation bar to get started.</p>
        <div className="cta-buttons">
          <Link to="/playground" className="cta-btn">Start Coding</Link>
          <Link to="/arena" className="cta-btn">Explore Arena</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
