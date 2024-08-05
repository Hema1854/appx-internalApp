

import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import headerBg from '../images/default_header_banner.png';
import appxLogo from '../images/Logo AppX White.png';
import logoutIcon from '../images/Logout White.png';
import contentBg from '../images/content_bg_image.jpeg';
import { useNavigate } from 'react-router-dom';
// import ProgressBar from './ProgressBar';
import './employee-medical-declaration.css'; // Import the CSS file

const EmployeeMedicalDeclaration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    typeOfEmployment: "",
    joiningDate: "",
    medicalCondition1: "",
    duration1: "",
    severity1: "",
    treatmentMedications1: "",
    medicalCondition2: "",
    duration2: "",
    severity2: "",
    treatmentMedications2: "",
    medicalCondition3: "",
    duration3: "",
    severity3: "",
    treatmentMedications3: ""
  });


  const gotoDefaultDashBoard = () => {
    navigate('/dashboard');
  }

  const logOutFromTheApplication = () => {
    navigate('/signin');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You mentioned you don't want to validate the form fields here
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('SuccessFully Submitted',data);
      } else {
        console.log('Not getting data', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="employee-medical-declaration-container">
      <div className="personal-details-header-section" style={{ backgroundImage: `url(${headerBg})` }}>
        <img src={appxLogo} alt="AppX Logo" className="personal-details-appx-logo" onClick={gotoDefaultDashBoard} />
        <h1 className="welcome-text">Welcome to Appx</h1>
        <div className="personal-details-logout" onClick={logOutFromTheApplication}>
          <img src={logoutIcon} alt="Logout" className="personal-details-logout-icon" />
          <span>Log out</span>
        </div>
      </div>
      <div className="employee-medical-declaration-body" style={{ backgroundImage: `url(${contentBg})` }}>
        {/* <ProgressBar progress=Pass progress value here /> */}
        <div className="employee-medical-declaration-content">
          <form className="form-card" onSubmit={handleSubmit}>
            <Row xs={1} md={2} lg={4}>
              <Col>
                <label className="form-label"><span className="required">*</span>Employee ID</label><br />
                <input  className="form-label-input"   type="text" name="employeeId" onChange={handleChange} value={formData.employeeId} />
               
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Employee Name</label><br />
                <input  className="form-label-input" type="text" name="employeeName" onChange={handleChange} value={formData.employeeName} />
         
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Type of Employment</label><br />
                <input  className="form-label-input"   type="text" name="typeOfEmployment" onChange={handleChange} value={formData.typeOfEmployment} />
             
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Joining Date</label><br />
                <input  className="form-label-input"  type="date" name="joiningDate" onChange={handleChange} value={formData.joiningDate} />
              
              </Col>
            </Row>
            <Row xs={1} md={2} lg={4}>
              <Col>
                <label className="form-label">Medical Condition 1</label><br />
                <input className="form-label-input" type="text" name="medicalCondition1" onChange={handleChange} value={formData.medicalCondition1} />
              </Col>
              <Col>
                <label className="form-label">Duration 1</label><br />
                <input className="form-label-input" type="text" name="duration1" onChange={handleChange} value={formData.duration1} />
              </Col>
              <Col>
                <label className="form-label">Severity 1</label><br />
                <input className="form-label-input" type="text" name="severity1" onChange={handleChange} value={formData.severity1} />
              </Col>
              <Col>
                <label className="form-label">Treatment/Medications 1</label><br />
                <input className="form-label-input" type="text" name="treatmentMedications1" onChange={handleChange} value={formData.treatmentMedications1} />
              </Col>
            </Row>
            {/* Repeat similar fields for Medical Condition 2 and 3 */}
            <div className="button-container">
              <Button className="save-button" variant="primary" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMedicalDeclaration;
