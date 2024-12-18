import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Playground from './components/CodingPlayground/Playground';
import Arena from './components/CodingArena/Arena';
import ProblemDetail from './components/CodingArena/ProblemDetail';
import UploadProblem from './components/CodingArena/UploadProblem';
import Login from './components/loginForm/login';
import './styles/variables.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div className="main-content">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={ <Navigate to='/'/>} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/problemDetail" element={<ProblemDetail />} />
              <Route path="/uploadProblem" element={<UploadProblem />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={
                  <Login onLogin={ () => setIsAuthenticated(true) } />
                }
              />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>
          <span className="outline">Welcome</span> to CodeForge
        </h1>
        <div className="cta-buttons">
          <Link to="/playground" className="cta-btn">Start Coding</Link>
          <Link to="/arena" className="cta-btn">Explore Arena</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
