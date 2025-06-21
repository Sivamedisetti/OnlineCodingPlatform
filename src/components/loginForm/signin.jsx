import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import github from '../../assets/github.svg';
import google from '../../assets/google.svg';
import { googleLogin , githubLogin} from './service'

function Signin({onLogin , setShowForgot}) {
  const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [is_auth , setIs_auth] = useState(false);
  const navigate = useNavigate();

  const Authentication = () => {
    
  }
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email , password } = state;

    if (!email || !password) {
      toast.error('All fields are required!', { position: 'top-center' });
      return;
    }

    console.log(email , password);
    axios.post(`${backendAPI}/login`, {email , password} , {
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username' , JSON.stringify(response.data.name));
          console.log('username: '+response.data.name)
          localStorage.setItem('access', JSON.stringify(response.data.access));
          onLogin();
          navigate("/home")
        }
      })
      .catch((error) => {
        toast.error("Unauthorized access!Try again");
      })
      .finally(() => {
        setState({
          email: "",
          password: ""
        });
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="form">
        <h1 className="h1">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="input"
        />
        <a className="a" onClick={() => setShowForgot(true)} >Forgot password?</a>
        <div className="social-button">
            <button type="button" className="google" onClick={() => googleLogin(onLogin , navigate)}>
              <img src={google} alt="google" className="social-img"/> &nbsp; Google
            </button>
            <button type="button" className="github" onClick={() => githubLogin(onLogin , navigate)}>
              <img src={github} alt="github" className="social-img"/> &nbsp; Github
            </button>
        </div>
        <button type="submit" className="button">Sign In</button>

      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Signin;
