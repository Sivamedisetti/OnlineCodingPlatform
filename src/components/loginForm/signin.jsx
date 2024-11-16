import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signin({onLogin}) {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { username, password } = state;

    if (!username || !password) {
      toast.error('All fields are required!', { position: 'top-center' });
      return;
    }

    axios.post("https://onlinecodingplatform.onrender.com/login", state)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem('isAuthenticated', 'true');
          onLogin();
          navigate("/home")
        }
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
      })
      .finally(() => {
        setState({
          username: "",
          password: ""
        });
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="form">
        <h1 className="h1">Sign in</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
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
        <a className="a" href="#">Forgot your password?</a>
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
