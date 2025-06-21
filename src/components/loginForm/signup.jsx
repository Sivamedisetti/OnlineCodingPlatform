import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import github from '../../assets/github.svg';
import google from '../../assets/google.svg';
import { googleLogin , githubLogin } from "./service";

function Signup({ onLogin }) {
  const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';

  const [state, setState] = React.useState({
    email: "",
    password: "",
    confirm_password: ""
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password , confirm_password } = state;

    if(password === confirm_password) axios.post(`${backendAPI}/signup`, state)
      .then((response) => { 
        toast.success('registered successfully')
      })
      .catch((err) => {
        if(err.response?.status === 400)
        {
          toast.error('The username already exists.')
        }
        else{
          toast.error('unable to register.Please try again')
        }
      })
      .finally(() => {
        setState({
          confirm_password: "",
          email: "",
          password: ""
        });
      });
    };

  return (
    <>
      <div className="form-container sign-up-container">
        <form onSubmit={handleOnSubmit} className="form">
          <h1 className="h1">Create Account</h1>
          
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
            required
          />
          <input
            type="password"
            name="confirm_password"
            value={state.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input"
            required
          />
          <div className="social-button" style={{marginTop: '0.5rem'}}>
            <button type="button" className="google" onClick={() => googleLogin(onLogin)}>
              <img src={google} alt="google" className="social-img"/> &nbsp; Google
            </button>
            <button type="button" className="github" onClick={() => githubLogin(onLogin)}>
              <img src={github} alt="github" className="social-img"/> &nbsp; Github
            </button>
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Signup;