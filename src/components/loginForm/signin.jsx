import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signin({onLogin}) {
  // const backendAPI = 'https://onlinecodingplatform.onrender.com';
  const backendAPI = 'http://localhost:8000';

  const [state, setState] = React.useState({
    email: "",
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

    const { email , password } = state;

    if (!email || !password) {
      toast.error('All fields are required!', { position: 'top-center' });
      return;
    }

    console.log(email , password);
    axios.post(`${backendAPI}/login`, state)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username' , JSON.stringify(response.data.username));
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
