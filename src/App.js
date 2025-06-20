import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Playground from './components/CodingPlayground/Playground';
import Arena from './components/CodingArena/Arena';
import ProblemDetail from './components/CodingArena/ProblemDetail';
import UploadProblem from './components/CodingArena/UploadProblem';
import Login from './components/loginForm/login';
import Request from './components/CodingArena/Request/request';
import NotFound from './components/CodingArena/NotFound';
import Forgot from './components/loginForm/forgot/Forgot';
import './styles/variables.css';
import './App.css';
import User from './components/CodingArena/Users/User';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    const confirm_box = window.confirm("Are you sure you want to logout?");

    if(!confirm_box) return;

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    setIsAuthenticated(false);
    navigate('/login')
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      {/* <ProfilePage/> */}
      <div className="main-content">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={ <Navigate to='/'/>} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/problemDetail" element={<ProblemDetail />} />
              <Route path="/uploadProblem" element={<UploadProblem setIsAuthenticated={setIsAuthenticated}/>} />
              {localStorage.getItem('access') === '"admin"' && 
                <>
                  <Route path='/request' element={<Request/>}/>
                  <Route path='/users' element={<User/>} />
                </>
              }
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/login" element={
                  <Login onLogin={ () => setIsAuthenticated(true) } />
                }
              />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/" element={<Home />} />
              <Route path='/home' element={ <Navigate to='/'/>} />
              <Route path="/playground" element={<Playground/>} />
              <Route path="/arena" element={<Navigate to='/login'/>} />
              <Route path="/problemDetail" element={<Navigate to='/login'/>} />
              <Route path="/uploadProblem" element={<Navigate to='/login'/>} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
    <div className="home-container">
      <div className="welcome-section">
        {
          localStorage.getItem('isAuthenticated') === 'true' &&
          <p className="hello-user">
            Hello, <span className="username">
              {JSON.parse(localStorage.getItem('username') || '"Guest"')}
            </span>
          </p>
        }
        <h1>
          <span className="outline">Welcome</span> to CodeForge
        </h1>
        <div className="cta-buttons">
          <Link to="/playground" className="cta-btn">Start Coding</Link>
          <Link to="/arena" className="cta-btn">Explore Arena</Link>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 CodeForge. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export default App;
