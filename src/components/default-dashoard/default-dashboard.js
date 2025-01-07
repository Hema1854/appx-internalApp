import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './default-dashboard.css';
import headerBg from '../images/header_bg_image.jpg';
import appxLogo from '../images/Logo AppX White.png';
import logoutIcon from '../images/Logout White.png';
import contentBg from '../images/content_bg_image.jpeg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const DefaultDashboard = () => {
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.LoginInfoReducer);
  const logOutFromTheApplication = () => {
      navigate('/signin');
  }

  return (
   <>
   <div className="header" style={{ backgroundImage: `url(${headerBg})` }}>
          <img src={appxLogo} alt="Appx Logo" className="appx-logo" />
          <h1 className="welcome-text">Welcome to Appx</h1>
          <p>Let's gear up for career acceleration</p>
          <div className="logout" onClick={logOutFromTheApplication}>
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
            <span>Logout</span>
          </div>
        </div>
        <div className="default-dashboard-content" style={{ backgroundImage: `url(${contentBg})` }}>
          <h2 className = "hello-text">Hello {loginInfo.userName} !
          </h2>
          <Carousel className="carousel">
            <Carousel.Item>
              <img className="d-block w-100" src={headerBg} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={headerBg} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={headerBg} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
   </>
  );
};

export default DefaultDashboard;