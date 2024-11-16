import React, { useState } from 'react';
import './loginstyle.css';
import Signin from './signin';
import Signup from './signup';

function Login({onLogin}) {
  const [type, setType] = useState("signin");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `container ${type === "signup" ? "right-panel-active" : ""}`;

  return (
    <div className="loginApp">
      <div className={containerClass} id="container">
        <Signup />
        <Signin onLogin={onLogin}/>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='h1'>Welcome Back!</h1>
              <p className='p'>To keep connected with us please login with your credentials</p>
              <button
                className="button-ghost"
                id="signin"
                onClick={() => handleOnClick("signin")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className='h1'>Hello, Coder!</h1>
              <p className='p'>Enter your details and start your journey with us</p>
              <button
                className="button-ghost"
                id="signup"
                onClick={() => handleOnClick("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;