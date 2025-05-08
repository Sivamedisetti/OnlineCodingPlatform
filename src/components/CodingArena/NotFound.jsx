import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import Page404 from '../../assets/Page404.png'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <img src={Page404} alt="404" className="notfound-img" />
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">PAGE NOT FOUND</h2>
      <p className="notfound-text">
        We looked everywhere for this page. <br />
        Are you sure the website URL is correct? <br />
        Get in touch with the site owner.
      </p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
