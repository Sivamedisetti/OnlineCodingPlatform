import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: ""
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

    const { username, email, password } = state;

    axios.post('https://onlinecodingplatform.onrender.com/signup', state)
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
          username: "",
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
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Name"
            className="input"
            required
          />
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