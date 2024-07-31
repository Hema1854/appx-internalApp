import React, { useState, useEffect } from 'react';
import './personal-details.css';
import headerBg from '../images/default_header_banner.png';
import appxLogo from '../images/Logo AppX White.png';
import logoutIcon from '../images/Logout White.png';
import contentBg from '../images/content_bg_image.jpeg';
import ProgressBar from './ProgressBar';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import 'flag-icon-css/css/flag-icons.min.css';

const sections = ['Employee Details', 'Personal Details', 'Qualification', 'Bank Details'];

const PersonalDetails = () => {
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState('Employee Details');
  const [progress, setProgress] = useState(0);
  const [personalInformation, setPersonalInformation] = useState([])
  const [employeeDetailsData, setEmployeeDetailsData] = useState({
    employeeId: "",
    employeeName: "",
    officialEmail: "",
    phoneNumber: "",
    alternativeContact: "",
    personalEmail: "",
    techHiredFor: "",
    joiningDate: "",
    designation: ""
  })
  const [personalData, setPersonalData] = useState({
    panNumber: "",
    aadharNumber: "",
    dobOfficial: "",
    dobOriginal: "",
    spouseName: "",
    spouseAadharNumber: "",
    dobSpouse: "",
    fatherName: "",
    motherName: "",
    emergencyContact: "",
    bloodGroup: "",
    hobbies: "",
    others: "",
  })

  const [qualificationData, setQualificationData] = useState({
    havePriorExp: false,
  })

  const [bankDetailsData, setbankDetailsData] = useState({
    acNumber: "",
    ifscCode:"",
    nameAsPerBank:"",
    branchName:"",
    uan:"",
    pfNumber:""
  })

  useEffect(() => {
    const currentIndex = sections.indexOf(selectedMenu);
    const newProgress = ((currentIndex + 1) / sections.length) * 100;
    setProgress(newProgress);
  }, [selectedMenu]);

  useEffect(() => {
    console.log('useEffect called');
    getPersonalInformation()
  }, []);

  const getPersonalInformation = async () => {
    try {
      const params = {
        email: "hema.bodapoori@app-xcelerate.com",
      };

      const response = await fetch('https://4ljgkngzqa.execute-api.us-east-1.amazonaws.com/dev/dashboardfetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      if (response.ok) {
//navigate('/dashboard');
        console.log('dataaa', data.user_details);
        setEmployeeDetailsData(prevState => ({
          ...prevState,
          employeeName: data.user_details.name !== "" ? data.user_details.name : "",
          officialEmail: data.user_details.officialEmail !== "" ? data.user_details.officialEmail : "",
          employeeId: data.user_details.employeeId !== "" ? data.user_details.employeeId : "",
          phoneNumber: data.user_details.phone !== "" ? data.user_details.phone : "",
          personalEmail: data.user_details.personalEmail !== "" ? data.user_details.personalEmail : "",
        }));
      } else {
        console.log('Not getting data', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  const gotoDefaultDashBoard = () => {
    navigate('/dashboard');
  }
  const logOutFromTheApplication = () => {
    navigate('/signin');
  }

  const handleEmployeeDetails = (e) => {
    const { name, value } = e.target;
    setEmployeeDetailsData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePersonalData = (e) => {
    const { name, value } = e.target;
    setPersonalData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBankDetailsData = (e) => {
    const { name, value } = e.target;
    setbankDetailsData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const onNextButtonClick = () => {
    console.log("employeeDetails", employeeDetailsData);
    console.log('personal Data', personalData);
    console.log('bankDeatilsData', bankDetailsData);
  }
  const onSubmitButtonClick = async () => {
    try {
      const params = {
          "employeeId": employeeDetailsData.employeeId,
          "name": employeeDetailsData.employeeName,
          "officialEmail": employeeDetailsData.officialEmail,
          "phone": employeeDetailsData.phoneNumber,
          "technologyHired": employeeDetailsData.techHiredFor,
          "joiningDate": employeeDetailsData.joiningDate,
          "personalEmail": employeeDetailsData.personalEmail,
          "panNumber": personalData.panNumber,
          "aadharNumber": personalData.aadharNumber,
          "dobOfficial": personalData.dobOfficial,
          "dobOriginal": personalData.dobOriginal,
          "spouseName": personalData.spouseName,
          "spouseAadharNumber": personalData.spouseAadharNumber,
          "dobSpouse": personalData.dobSpouse,
          "fatherName": personalData.fatherName,
          "motherName": personalData.motherName,
          "emergencyContact": personalData.emergencyContact,
          "bloodGroup": personalData.bloodGroup,
          "hobbies": personalData.hobbies,
          "others": personalData.others,
          "acNumber": bankDetailsData.acNumber,
          "ifscCode": bankDetailsData.ifscCode,
          "nameAsPerBank": bankDetailsData.nameAsPerBank,
          "branchName": bankDetailsData.branchName,
          "uan": bankDetailsData.uan,
          "pfNumber": bankDetailsData.pfNumber
      };
  
      console.log('Empty fields before submit:', emptyFields);
  
      const response = await fetch('https://4ljgkngzqa.execute-api.us-east-1.amazonaws.com/dev/personaldetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('SuccessFully Submitted');
      } else {
        console.log('Not getting data', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  const handleCheckboxChange = () => {
    setQualificationData((prevData) => ({
      ...prevData,
      havePriorExp: !prevData.havePriorExp,
    }));
  };

  const renderForm = () => {
    const { employeeId, employeeName, officialEmail, phoneNumber, alternativeContact, personalEmail, techHiredFor, joiningDate, designation } = employeeDetailsData
    const { panNumber, aadharNumber, dobOfficial, dobOriginal, spouseName, spouseAadharNumber, dobSpouse, fatherName, motherName, emergencyContact, bloodGroup, hobbies, others } = personalData
    const {acNumber, ifscCode, nameAsPerBank, branchName, uan, pfNumber} = bankDetailsData;
    switch (selectedMenu) {
      case 'Employee Details':
        return (
          <div className="form-container">
            <center>
              <h1 className="section-heading">Employee Details</h1></center>
            <Row>
              <Col>
                <label className="form-label">Employee ID <span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="employeeId" onChange={handleEmployeeDetails} value={employeeId} />
              </Col>
              <Col>
                <label className="form-label">Employee Name<span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="employeeName" disabled={true} onChange={handleEmployeeDetails} value={employeeName} />
              </Col>
              <Col>
                <label className="form-label">Official Email<span className="required">*</span></label><br />
                <input className="form-label-input" disabled={true} type="text" name="officialEmail" onChange={handleEmployeeDetails} value={officialEmail} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Phone<span className="required">*</span></label> <br />
                <PhoneInput 
  country={'in'}
  value={phoneNumber}
  onChange={(phone) => {
    console.log('Phone number changed:', phone); // This will log the phone number when it changes
    setEmployeeDetailsData(prevState => ({
      ...prevState,
      phoneNumber: phone
    }));
  }}
/>
              </Col>
              <Col>
                <label className="form-label">Alternative Contact Number</label> <br />
                <PhoneInput 
                  country={'in'}
                  value={alternativeContact}
                  onChange={(phone) => setEmployeeDetailsData(prevState => ({
                    ...prevState,
                    alternativeContact: phone
                  }))}
                />
              </Col>
              <Col>
                <label className="form-label">Personal Email</label> <br />
                <input className="form-label-input" type="text" name="personalEmail" onChange={handleEmployeeDetails} value={personalEmail} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Technology Hired For</label> <br />
                <input className="form-label-input" type="text" name="techHiredFor" onChange={handleEmployeeDetails} value={techHiredFor} />
              </Col>
              <Col>
                <label className="form-label">Joining Date</label> <br />
                <input className="form-label-input" type="date" name="joiningDate" onChange={handleEmployeeDetails} value={joiningDate} />
              </Col>
              <Col>
                <label className="form-label">Designation</label> <br />
                <input className="form-label-input" type="text" name="designation" onChange={handleEmployeeDetails} value={designation} />
              </Col>
            </Row>


          </div>
        );
        
      case 'Personal Details':
        return (
          <div className="form-container">
            <center>
              <h1 className="section-heading">Personal Details</h1></center>
            <Row>
              <Col className="section-heading-col">
                <label className="form-label">PAN Number<span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="panNumber" onChange={handlePersonalData} value={panNumber} />
              </Col>
              <Col className="section-heading-col">
                <label className="form-label">Aadhar Number<span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="aadharNumber" onChange={handlePersonalData} value={aadharNumber} />
              </Col>
              <Col className="section-heading-col">
                <label className="form-label">Official Date of Birth</label><br />
                <input className="form-label-input" type="date" name="dobOfficial" onChange={handlePersonalData} value={dobOfficial} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Original Date of Birth</label><br />
                <input className="form-label-input" type="date" name="dobOriginal" onChange={handlePersonalData} value={dobOriginal} />
              </Col>
              <Col>
                <label className="form-label">Marital Status</label> <br />
                <select className="form-label-input" >
                  <option>Select</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </Col>
              <Col>
                <label className="form-label">Spouse Name</label><br />
                <input className="form-label-input" type="text" name="spouseName" onChange={handlePersonalData} value={spouseName} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Spouse Aadhar Number</label><br />
                <input className="form-label-input" type="text" name="spouseAadharNumber" onChange={handlePersonalData} value={spouseAadharNumber} />
              </Col>
              <Col>
                <label className="form-label">Spouse Date of Birth</label><br />
                <input className="form-label-input" type="text" name="dobSpouse" onChange={handlePersonalData} value={dobSpouse} />
              </Col>
              <Col>
                <label className="form-label">Child 1 Name</label><br />
                <input className="form-label-input" ype="text" name="child1Name" />
              </Col>

            </Row>
            <Row>
              <Col>
                <label className="form-label">Child 1 Date of Birth</label><br />
                <input className="form-label-input" type="text" name="dobChild1" />
              </Col>
              <Col>
                <label className="form-label">Child 2 Name</label><br />
                <input className="form-label-input" type="text" name="child2Name" />
              </Col>
              <Col>
                <label className="form-label">Child 2 Date of Birth</label><br />
                <input className="form-label-input" type="text" name="dobChild2" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Father Name</label><br />
                <input className="form-label-input" type="text" name="fatherName" onChange={handlePersonalData} value={fatherName} />
              </Col>
              <Col>
                <label className="form-label">Mother Name</label><br />
                <input className="form-label-input" type="text" name="motherName" onChange={handlePersonalData} value={motherName} />
              </Col>
              <Col>
                <label className="form-label">Emergency Contact Details</label><br />
                <input className="form-label-input" type="text" name="emergencyContact" onChange={handlePersonalData} value={emergencyContact} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Blood Group</label><br />
                <input className="form-label-input" type="text" name="bloodGroup" onChange={handlePersonalData} value={bloodGroup} />
              </Col>
              <Col>
                <label className="form-label">Hobbies</label><br />
                <input className="form-label-input" type="text" name="hobbies" onChange={handlePersonalData} value={hobbies} />
              </Col>
              <Col>
                <label className="form-label">Others</label><br />
                <input className="form-label-input" type="text" name="others" onChange={handlePersonalData} value={others} />
              </Col>
            </Row>


          </div>
        );
      case 'Qualification':
        return (
          <>
          <div className="form-container">
            <center> <h1 className="section-heading">Qualification</h1></center>
            <div>
              <p className = "personal-dtls-sub-heading">Under Graduation Details</p>
            </div>
            <Row>
              <Col>
                <label className="form-label">Under Graduate Degree</label><br />
                <input className="form-label-input" placeholder='e.g. Bachelor of Technology' type="text" name="employeeId" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input className="form-label-input" placeholder='e.g. Computer Science' type="text" name="employeeId" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input className="form-label-input" type="text" name="officialEmail" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label> <br />
                <input className="form-label-input" type="text" name="phone" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input className="form-label-input" type="text" name="alternativeContact" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input className="form-label-input" type="text" name="personalEmail" />
              </Col>
            </Row>
            <div>
              <p className = "personal-dtls-sub-heading">Post Graduation Details</p>
            </div>
            <Row>
              <Col>
                <label className="form-label">Post Graduate Degree</label><br />
                <input className="form-label-input" placeholder='e.g. M.Tech' type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label><br />
                <input className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <div>
              <p className = "personal-dtls-sub-heading">Additional Education (if applicable)</p>
            </div>
            <Row>
              <Col>
                <label className="form-label">PhD/Doctorate Degree</label><br />
                <input className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label><br />
                <input className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
          </div>
          <div className="exp-confirmation">
              <input type='checkbox' checked = {qualificationData.havePriorExp} onChange={handleCheckboxChange}/>
              <label className="form-label">Do you have prior work experience?</label>           
          </div>
          {qualificationData.havePriorExp ? 
          <div className="form-container">
            <Row>
              <Col>
                <label className="form-label">Overall Experience</label><br />
                <select className="form-label-input" > 
                  <option>Select</option>
                  <option>0 to 1</option>
                  <option>1 to 5</option>
                  <option>5 to 9</option>
                  <option>9 to 15</option>
                  <option>15 plus</option>
                </select>
              </Col>
              <Col>
                <label className="form-label" >Relevant Experience </label><br />
                <select className="form-label-input" >
                  <option>Select</option>
                  <option>0 to 1</option>
                  <option>1 to 5</option>
                  <option>5 to 9</option>
                  <option>9 to 15</option>
                  <option>15 plus</option>
                </select>
              </Col>
              <Col>
                <label className="form-label">Last Company Name</label><br />
                <input className="form-label-input" type="text" name="officialEmail" />
              </Col>
            </Row>
          
          </div> : null}
          </>
        );
      case 'Bank Details':
        return (
          <div className="form-container">
            <center>
              <h1 className="section-heading">Bank Details</h1></center>
            <Row>
              <Col>
                <label className="form-label">Account Number<span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="acNumber" onChange={handleBankDetailsData} value = {acNumber} />
              </Col>
              <Col>
                <label className="form-label">IFSC Code<span className="required">*</span></label> <br />
                <input className="form-label-input" type="text" name="ifscCode" onChange={handleBankDetailsData} value={ifscCode} />
              </Col>
              <Col>
                <label className="form-label">Name as per A/C<span className="required">*</span></label><br />
                <input className="form-label-input" type="text" name="nameAsPerBank" onChange={handleBankDetailsData}  value={nameAsPerBank}/>
              </Col>
            </Row>

            {/* <p className ="form-sub-heading">UAN Details</p> */}
            <Row>
              <Col>
                <label className="form-label">Branch<span className="required">*</span></label> <br />
                <input className="form-label-input" type="text" name="branchName" onChange={handleBankDetailsData} value={branchName} />
              </Col>
              <Col>
                <label className="form-label">UAN</label> <br />
                <input className="form-label-input" type="text" name="uan" onChange={handleBankDetailsData} value={uan} />
              </Col>
              <Col>
                <label className="form-label">PF</label> <br />
                <input className="form-label-input" type="text" name="pfNumber" onChange={handleBankDetailsData} value={pfNumber} />
              </Col>
            </Row>


          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="personal-details-container">
      <div className="personal-details-header-section" style={{ backgroundImage: `url(${headerBg})` }}>
        <img src={appxLogo} alt="AppX Logo" className="personal-details-appx-logo" onClick={gotoDefaultDashBoard} />
        <h1 className="welcome-text">Personal Information</h1>
        <div className="personal-details-logout" onClick={logOutFromTheApplication}>
          <img src={logoutIcon} alt="Logout" className="personal-details-logout-icon" />
          <span>Log out</span>
        </div>
      </div>
      <div className="personal-details-body" style={{ backgroundImage: `url(${contentBg})` }}>
        <div className="left-section">
          <h1 className="greeting">Hello SpaceMan !</h1>
          <div className="personal-details-sidebar">
            <ul className="personal-details-menu">
              {sections.map((section) => (
                <li
                  key={section}
                  className={`personal-details-menu-item ${selectedMenu === section ? 'selected' : ''}`}
                  onClick={() => setSelectedMenu(section)}
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="personal-details-content">
  <ProgressBar progress={progress} />
  <div className="form-card">
    {renderForm()}
  </div>
    <div className="button-container">
      <Button className='next-button' onClick={onNextButtonClick}>Next</Button>
    </div>
<div className="button-container">
<Button className='next-button' onClick={onSubmitButtonClick}>Submit</Button>
  </div>
</div>
      </div>
    </div>
  );
};

export default PersonalDetails;
