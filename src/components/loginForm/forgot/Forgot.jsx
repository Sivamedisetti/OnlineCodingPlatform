import React, { useState } from 'react';
import './forgot.css';
import { sendResetPassword } from '../service';
import { useNavigate } from 'react-router-dom';

const Forgot = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) sendResetPassword(email);
    onClose();
  };

  return (
    <div className='forgot-wrapper'>
      <div className='forgot-box'>
        <form onSubmit={handleSubmit}>
          <h2 className="forgot-title">Reset Password</h2>
          <input 
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
            className="forgot-input"
            required
          />
          <div className="forgot-actions">
            <button type="submit" className="forgot-submit">Send Reset Link</button>
            <button type="button" className="forgot-close" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
