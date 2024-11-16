import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Signup() {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { username, email, password } = state;
    console.log(state);

    if (!username || !email || !password) {
      toast.error('All fields are required!', { position: 'top-center' });
      return;
    }

    axios.post('https://onlinecodingplatform.onrender.com/signup', state)
      .then((response) => {
        toast.success(`${username} registered successfully`)
      })
      .catch((err) => {
        if(err.response?.status === 400)
        {
          toast.error(`The username ("${username}") already exists.`)
        }
        else{
          toast.error(`unable to register.Please try again`)
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
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />
          <button className="button">Sign Up</button>
        </form>

      </div>

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
    </>
  );
}

export default Signup;
