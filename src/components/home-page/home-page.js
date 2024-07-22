import React from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './home-page.css';
import companyLogo from '../images/appx-logo.png';

function HomePage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/signin');
    };
    return (
       <div className = "home-page-main-container">
        <div className = "header-section">
            <Row noGutters>
                <Col xs={12} sm={12} md={10} >
                    <p className = "home-page-text"> AppXcelerate Solutions Pvt Ltd, HustleHub SB01, HSR Layout 5th Sector, Bengaluru-560034 | info@app-xcelerate.com | +91 9491434143 </p>
                </Col >
                <Col xs={12} sm={12} md={2}>
                    <Button className='employee-login-button' onClick={handleLoginClick}>EMPLOYEE LOGIN</Button>
                </Col>
            </Row>

        </div>
        <div className = "logo-section">
            <Row>
            <Col xs={12} sm={12} md={2} > 
            <img src={companyLogo} alt="Company Logo" className="company-logo" />
            </Col>
            <Col xs={12} sm={12} md={10} > 
            <div className='d-flex flex-row justify-content-around mt-4'>
            <p className = "logo-section-headings">HOME</p>   
            <p className = "logo-section-headings">ABOUT US</p> 
            <p className = "logo-section-headings">INDUSTRIES</p>
            <p className = "logo-section-headings">SERVICES</p>
            <p className = "logo-section-headings">TECHNOLOGIES</p>
            <p className = "logo-section-headings">CONTACT</p>
            <p className = "logo-section-headings">ENQUIRE NOW</p>
            </div>
           
            </Col>
            </Row>
        </div>
        <div className = "main-content"></div>

       </div>
    );
}

export default HomePage;
