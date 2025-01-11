import React, { useState, useEffect } from 'react';
import './personal-details.css';
import headerBg from '../images/default_header_banner.png';
import appxLogo from '../images/Logo AppX White.png';
import logoutIcon from '../images/Logout White.png';
import contentBg from '../images/content_bg_image.jpeg';
import ProgressBar from './ProgressBar';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubMenuInfoAction } from '../../Redux/Action/SubMenuInfoAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import 'flag-icon-css/css/flag-icons.min.css';
import AlertMessage from '../AlertMessage/alert-message';
import { FaTrash } from 'react-icons/fa';

const sections = ['Employee Details', 'Personal Details', 'Qualification', 'Bank Details'];

const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.LoginInfoReducer);
  const subMenuInfo = useSelector((state) => state.SubMenuInfoReducer);
  // const employeeName = useSelector((state) => state.user.employeeName);

  const [selectedMenu, setSelectedMenu] = useState(subMenuInfo.subMenu);
  const [progress, setProgress] = useState(0);
  const [personalInformation, setPersonalInformation] = useState([])
  const [children, setChildren] = useState([]);
  const [disableFields, setDisableFields] = useState(false)
  const [employeeDetailsData, setEmployeeDetailsData] = useState({
    employeeId: "",
    employeeName: "",
    officialEmail: loginInfo.userEmail,
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
    maritalStatus: "",
    spouseName: "",
    spouseAadharNumber: "",
    dobSpouse: "",
    fatherName: "",
    motherName: "",
    emergencyContact: "",
    bloodGroup: "",
    hobbies: "",
    others: "",
    numberOfChildren: 3,
  })
  const [alertObj, updateAlertMessage] = useState({
    isSuccess: false,
    message: "",
    isWarning: false,
    title: "",
  });

  const showAlertMessage = (title, msg) => {
    const msgObj = { ...alertObj };
    msgObj.title = title;
    msgObj.message = msg;
    switch (title) {
      case "Failure":
        msgObj.isFailure = true;
        break;
      case "Warning":
        msgObj.isWarning = true;
        break;
      case "Success":
        msgObj.isSuccess = true;
        break;
    }
    updateAlertMessage(msgObj);
    setTimeout(() => {
      updateAlertMessage({
        isSuccess: false,
        message: "",
        isWarning: false,
        isFailure: false,
        title: "",
      });
    }, 3000);
  };

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

  const [employeeDetailsErr, setEmployeeDetailsErr] = useState({
    employeeIdErr: false,
    employeeNameErr: false,
    officialEmailErr: false,
    phoneNumberErr: false,
    techHiredForErr: false,
    alternativeContact:false,
    joiningDateErr:false
  })
const[personalDataErr, setPersonalDataErr]=useState({
  panNumberErr:false,
  aadharNumberErr:false,
  fatherNameErr:false,
  motherNameErr:false,
  emergencyContactErr:false
})
const[BankDetailsErr,setbankDetailsDataErr]=useState({
  acNumberErr:false,
  ifscCodeErr:false,
  nameAsPerBankErr:false,
  branchNameErr:false
})
  useEffect(() => {
    console.log("enteredddddddddd");
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
        email: loginInfo.userEmail
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
        console.log('dataaaA', data);
        console.log('dataaa', data.user_details);
        if(data.user_details !== undefined){
          if(data.user_details.is_temporary == 1){
            console.log('1')
            setDisableFields(false)
          }
          if(data.user_details.is_temporary == 0){
            console.log('11')
            setDisableFields(false)
          }
          setEmployeeDetailsData(prevState => ({
            ...prevState,
            employeeName: data?.user_details?.name !== "" ? data.user_details.name : "",
            // officialEmail: data?.user_details?.officialEmail !== "" ? data.user_details.officialEmail : "",
            employeeId: data.user_details.employeeId !== "" ? data.user_details.employeeId : "",
            phoneNumber: data.user_details.phone !== "" ? data.user_details.phone : "",
            alternativeContact:data.user_details.alternativeContact!==""?data.user_details.alternativeContact:"",
            personalEmail: data.user_details.personalEmail !== "" ? data.user_details.personalEmail : "",
            techHiredFor: data.user_details.technologyHired !== "" ? data.user_details.technologyHired : "",
            joiningDate: data.user_details.joiningDate !== "" ? data.user_details.joiningDate : "",
            designation: data.user_details.designationAppx !== "" ? data.user_details.designationAppx : "",
          }));
          setPersonalData(prevState => ({
            ...prevState,
            panNumber:data.user_details?.panNumber!== "" ? data.user_details.panNumber:"",
            aadharNumber:data.user_details?.aadharNumber!== "" ? data.user_details.aadharNumber:"",
            fatherName:data.user_details?.fathersName!== "" ? data.user_details.fathersName:"",
            motherName:data.user_details?.mothersName!== "" ? data.user_details.mothersName:"",
            bloodGroup:data.user_details?.bloodGroup!== ""?  data.user_details.bloodGroup:"",
            emergencyContact:data.user_details?.emergencyContact!== ""?data.user_details.emergencyContact:"",  
            maritalStatus: data.user_details?.maritalStatus !== "" ? data.user_details.maritalStatus : "",
            dobOfficial: data.user_details?.dobOfficial !== "" ? data.user_details.dobOfficial : "",
            dobOriginal:data.user_details?.dobOriginal !== "" ? data.user_details.dobOriginal : "",
        }));  
        setbankDetailsData(
          prevState => ({
            ...prevState,
            acNumber:data.user_details?.accountNumber!== "" ? data.user_details.accountNumber:"",
            ifscCode:data.user_details?.ifscCode!== "" ? data.user_details.ifscCode:"",
            nameAsPerBank:data.user_details?.accountHolderName!==""?data.user_details.accountHolderName:"",
            branchName:data.user_details?.bankName!== ""?data.user_details.bankName:"",
            pfNumber:data.user_details?.bankPf!==""?data.user_details.bankPf:"",
            uan:data.user_details?.bankUan!==""?data.user_details.bankUan:""
         }));
      } else {
        console.log('Not getting data', data.message);
      }
    }} catch (error) {
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
    if(subMenuInfo.subMenu === 'Employee Details') {
      dispatch(SubMenuInfoAction('Personal Details'))
    } else if(subMenuInfo.subMenu === 'Personal Details') {
      dispatch(SubMenuInfoAction('Qualification'))
    } else if(subMenuInfo.subMenu === 'Qualification') {
      dispatch(SubMenuInfoAction('Bank Details'))
    } 
  }
  const onSaveButtonClick = async() => {
    const { employeeId, employeeName, officialEmail, phoneNumber, alternativeContact, personalEmail, techHiredFor, joiningDate, designation } = employeeDetailsData
    const { panNumber, aadharNumber, dobOfficial,maritalStatus, dobOriginal, spouseName, spouseAadharNumber, dobSpouse, fatherName, motherName, emergencyContact, bloodGroup, hobbies, others } = personalData
    // const {acNumber, ifscCode, nameAsPerBank, branchName, uan, pfNumber} = bankDetailsData;
    console.log('joiningDate', maritalStatus);
    try {
      const params = {
          "employeeId": employeeDetailsData.employeeId ,
          "name": employeeDetailsData.employeeName,
          "officialEmail": employeeDetailsData.officialEmail,
          "phone": employeeDetailsData.phoneNumber,
          "alternativeContact": employeeDetailsData.alternativeContact,
          "designationAppx":employeeDetailsData.designation,
          "technologyHired": employeeDetailsData.techHiredFor,
          "joiningDate": employeeDetailsData.joiningDate,
          "personalEmail": employeeDetailsData.personalEmail,
          "panNumber": personalData.panNumber,
          "aadharNumber": personalData.aadharNumber,
          "dobOfficial": personalData.dobOfficial,
          "dobOriginal": personalData.dobOriginal,
          "maritalStatus":personalData.maritalStatus,
          "spouseName": personalData.spouseName,
          "spouseAadharNumber": personalData.spouseAadharNumber,
          "dobSpouse": personalData.dobSpouse,
          "fathersName": personalData.fatherName,
          "mothersName": personalData.motherName,
          "emergencyContact": personalData.emergencyContact,
          "bloodGroup": personalData.bloodGroup,
          // "hobbies": personalData.hobbies ----------- This field needs to be add in UI ,
          "accountNumber": bankDetailsData.acNumber,
          "ifscCode": bankDetailsData.ifscCode,
          "accountHolderName": bankDetailsData.nameAsPerBank,
          "bankName": bankDetailsData.branchName,
          "bankUan": bankDetailsData.uan,
          "bankPf": bankDetailsData.pfNumber
      };
      const response = await fetch('https://4ljgkngzqa.execute-api.us-east-1.amazonaws.com/dev/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Data Saved Temporarily',data);
        showAlertMessage(
          "Success",
          'Data Saved Temporarily'
        );
      } else {
        console.log('Not getting data', data.message);
        // showAlertMessage("Failure", response?.errorMessage);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    
  }
  const onSubmitButtonClick = async () => {
    const { employeeId, employeeName, officialEmail, phoneNumber, alternativeContact, personalEmail, techHiredFor, joiningDate, designation } = employeeDetailsData
    const { panNumber, aadharNumber, dobOfficial, dobOriginal, spouseName, spouseAadharNumber, dobSpouse, fatherName, motherName, emergencyContact, bloodGroup, hobbies, others } = personalData
    const {acNumber, ifscCode, nameAsPerBank, branchName, uan, pfNumber} = bankDetailsData;
    if(employeeId === "" || employeeName === ""  || phoneNumber === "") {
      dispatch(SubMenuInfoAction('Employee Details'));
      setEmployeeDetailsErr(prevState => ({
        ...prevState,
        employeeIdErr: employeeId === "" ? true : false,
        employeeNameErr: employeeName === "" ? true : false,
        // officialEmailErr: officialEmail === "" ? true : false,
        phoneNumberErr: phoneNumber === "" ? true : false,
        techHiredForErr: techHiredFor === "" ? true : false,
        joiningDateErr: joiningDate === "" ? true : false,
      }));
    } else if(panNumber === "" || aadharNumber === "" || fatherName === "" || motherName === "" || emergencyContact === "") {
      dispatch(SubMenuInfoAction('Personal Details'));
      setPersonalDataErr(prevState => ({
        ...prevState,
        panNumberErr: panNumber === "" ? true : false,
        aadharNumberErr: aadharNumber === "" ? true : false,
        fatherNameErr: fatherName === "" ? true : false,
        motherNameErr: motherName === "" ? true : false,
        emergencyContactErr: emergencyContact === "" ? true : false,
      }));
    }
    else if(acNumber === "" || ifscCode === "" || nameAsPerBank === "" ||  branchName ===""){
      dispatch(SubMenuInfoAction('Bank Details'));
      setbankDetailsDataErr(prevState => ({
        ...prevState,
        acNumberErr: acNumber === "" ? true : false,
        ifscCodeErr: ifscCode === "" ? true : false,
        nameAsPerBankErr: nameAsPerBank === "" ? true : false,
        branchNameErr:branchName === ""?true:false,
      }));
    }
    
    try {
      const params = {
          "employeeId": employeeDetailsData.employeeId,
          "name": employeeDetailsData.employeeName,
          "officialEmail": employeeDetailsData.officialEmail,
          "phone": employeeDetailsData.phoneNumber,
          "alternativeContact": employeeDetailsData.alternativeContact,
          "designationAppx":employeeDetailsData.designation,
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
          "fathersName": personalData.fatherName,
          "mothersName": personalData.motherName,
          "emergencyContact": personalData.emergencyContact,
          "bloodGroup": personalData.bloodGroup,
          "hobbies": personalData.hobbies,
          "others": personalData.others,
          "accountNumber": bankDetailsData.acNumber,
          "ifscCode": bankDetailsData.ifscCode,
          "accountHolderName": bankDetailsData.nameAsPerBank,
          "bankName": bankDetailsData.branchName,
          "bankUan": bankDetailsData.uan,
          "bankPf": bankDetailsData.pfNumber
      };
      const response = await fetch('https://4ljgkngzqa.execute-api.us-east-1.amazonaws.com/dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('SuccessFully Submitted',data);
        showAlertMessage(
          "Success",
          'Data Submitted SuccessFully'
        );
        setDisableFields(false)
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

   const handleAddChild = () => {
    // Add a new child object with empty values (can modify later to collect child data)
    const newChild = { childName: "", childAadharNumber: "", childAge: "" };
    setChildren([...children, newChild]);
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...children];
    updatedChildren[index][name] = value;
    setChildren(updatedChildren);

    // Console log the updated children details
    console.log("Updated Children Details:", updatedChildren);
  };
  const handleDeleteChild = (index) => {
    const updatedChildren = children.filter((_, i) => i !== index);
    setChildren(updatedChildren); // Assuming `setChildren` is the state setter for `children`
  };
  

  const renderForm = () => {
    const { employeeId, employeeName, officialEmail,numberOfChildren, phoneNumber, alternativeContact, personalEmail, techHiredFor, joiningDate, designation } = employeeDetailsData
    const { panNumber, aadharNumber, dobOfficial,maritalStatus, dobOriginal, spouseName, spouseAadharNumber, dobSpouse, fatherName, motherName, emergencyContact, bloodGroup, hobbies, others } = personalData
    const {acNumber, ifscCode, nameAsPerBank, branchName, uan, pfNumber} = bankDetailsData;
    const {employeeIdErr, employeeNameErr, officialEmailErr, phoneNumberErr, techHiredForErr,joiningDateErr} = employeeDetailsErr;
    const {panNumberErr, aadharNumberErr,fatherNameErr, motherNameErr, emergencyContactErr}=personalDataErr;
    const {acNumberErr, ifscCodeErr, nameAsPerBankErr, branchNameErr}=BankDetailsErr;
    switch (subMenuInfo.subMenu) {
      case 'Employee Details':
        return (
          <div className="form-container">
            <center>
              <h1 className="section-heading">Employee Details</h1></center>
            <Row xs={1} md={2} lg={4}>
              <Col>
                <label className="form-label"><span className="required">*</span>Employee ID </label><br />
                <input className={`form-label-input ${ employeeIdErr? 'error-border' : ''}`}
                type="text" name="employeeId" disabled = {disableFields} onChange={handleEmployeeDetails} value={employeeId} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Employee Name</label><br />
                <input className={`form-label-input ${ employeeNameErr? 'error-border' : ''}`}
                 type="text" name="employeeName" disabled = {disableFields} onChange={handleEmployeeDetails} value={employeeName} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Official Email</label><br />
                <input className={`form-label-input ${officialEmailErr? 'error-border' : ''}`} disabled = {true} type="text" name="officialEmail" onChange={handleEmployeeDetails} value={loginInfo.userEmail} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Personal Email</label> <br />
                <input className="form-label-input" type="text" name="personalEmail" disabled = {disableFields} onChange={handleEmployeeDetails} value={personalEmail} />
              </Col>
            </Row>
            <Row xs={1} md={2} lg={4}>
              <Col>
                <label className="form-label"><span className="required">*</span>Phone</label> <br />
                <PhoneInput
                  enableSearch = {true}
                  country={'in'}
                  disabled = {disableFields}
                  countryCodeEditable={false}
                  value={phoneNumber}
                  inputStyle={{
                    width: "192px",
                    height: "30px",
                    border: `1px solid ${phoneNumberErr ? 'red' : '#888'}`,
                    borderRadius: "2px",
                    boxShadow: 'none'
                  }}
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
                  disabled = {disableFields}
                  enableSearch = {true}
                  value={alternativeContact}
                  countryCodeEditable={false}
                  onChange={(phone) => setEmployeeDetailsData(prevState => ({
                    ...prevState,
                    alternativeContact: phone
                  }))}
                  inputStyle={{
                    width: "192px",
                    height: "30px",
                    border: "1px solid #888",
                    borderRadius: "2px",
                    boxShadow: 'none'
                  }}
                />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Technology Hired For</label> <br />
                <input disabled = {disableFields} className={`form-label-input ${techHiredForErr? 'error-border' : ''}`} type="text" name="techHiredFor" onChange={handleEmployeeDetails} value={techHiredFor} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Joining Date</label> <br />
                <input disabled = {disableFields} className={`form-label-input ${joiningDateErr? 'error-border' : ''}`} type="date" name="joiningDate" onChange={handleEmployeeDetails} value={joiningDate} />
              </Col>
              
            </Row>
            <Row xs={1} md={2} lg={4}>
             
              <Col>
                <label className="form-label">Designation</label> <br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="designation" onChange={handleEmployeeDetails} value={designation} />
              </Col>
            </Row>


          </div>
        );
        
        case 'Personal Details':
          return (
            <div className="form-container">
              <center>
                <h1 className="section-heading">Personal Details</h1>
              </center>
              <Row xs={1} md={2} lg={4}>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>PAN Number
                  </label><br />
                  <input disabled={disableFields} className={`form-label-input ${panNumberErr ? 'error-border' : ''}`} type="text" name="panNumber" onChange={handlePersonalData} value={panNumber} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Aadhar Number
                  </label><br />
                  <input disabled={disableFields} className={`form-label-input ${aadharNumberErr ? 'error-border' : ''}`} type="text" name="aadharNumber" onChange={handlePersonalData} value={aadharNumber} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Emergency Contact Details
                  </label><br />
                  <input disabled={disableFields} className={`form-label-input ${emergencyContactErr ? 'error-border' : ''}`} type="text" name="emergencyContact" onChange={handlePersonalData} value={emergencyContact} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">Blood Group</label><br />
                  <input disabled={disableFields} className="form-label-input" type="text" name="bloodGroup" onChange={handlePersonalData} value={bloodGroup} />
                </Col>
              </Row>
        
              <Row xs={1} md={2} lg={4}>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Official Date of Birth
                  </label><br />
                  <input disabled={disableFields} className="form-label-input" type="date" name="dobOfficial" onChange={handlePersonalData} value={dobOfficial} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Original Date of Birth
                  </label><br />
                  <input disabled={disableFields} className="form-label-input" type="date" name="dobOriginal" onChange={handlePersonalData} value={dobOriginal} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Father Name
                  </label><br />
                  <input disabled={disableFields} className={`form-label-input ${fatherNameErr ? 'error-border' : ''}`} type="text" name="fatherName" onChange={handlePersonalData} value={fatherName} />
                </Col>
                <Col className="section-heading-col">
                  <label className="form-label">
                    <span className="required">*</span>Mother Name
                  </label><br />
                  <input disabled={disableFields} className={`form-label-input ${motherNameErr ? 'error-border' : ''}`} type="text" name="motherName" onChange={handlePersonalData} value={motherName} />
                </Col>
              </Row>
        
              <Row className="d-flex justify-content-between">
  <Col md={3} className="section-heading-col">
    <label className="form-label">Marital Status</label><br />
    <select className="form-label-input" name="maritalStatus" onChange={handlePersonalData} value={maritalStatus}>
      <option value="">Select</option>
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="divorced">Divorced</option>
      <option value="widowed">Widowed</option>
    </select>
  </Col>

  {maritalStatus === "married" && (
    <>
      <Col md={3} className="section-heading-col">
        <label className="form-label">Spouse Name</label><br />
        <input className="form-label-input" type="text" name="spouseName" onChange={handlePersonalData} value={spouseName} />
      </Col>
      <Col md={3} className="section-heading-col">
        <label className="form-label">Spouse Aadhar Number</label><br />
        <input className="form-label-input" type="text" name="spouseAadharNumber" onChange={handlePersonalData} value={spouseAadharNumber} />
      </Col>
      <Col md={3} className="section-heading-col">
        <label className="form-label">Spouse Date of Birth</label><br />
        <input className="form-label-input" type="text" name="dobSpouse" onChange={handlePersonalData} value={dobSpouse} />
      </Col>

      <Col md={3} className="d-flex justify-content-start align-items-center">
        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddChild}>
          + Add Child
        </button>
      </Col>
    </>
  )}
</Row>


              {children.map((child, index) => (
                <Row key={index} className="d-flex align-items-center mb-3">
                  <Col md={3} className="section-heading-col">
                    <label className="form-label">{`Child ${index + 1} Name`}</label><br />
                    <input className="form-label-input" type="text" name="childName" value={child.childName} onChange={(e) => handleChildChange(index, e)} />
                  </Col>
                  <Col md={3} className="section-heading-col">
                    <label className="form-label">{`Child ${index + 1} Aadhar Number`}</label><br />
                    <input className="form-label-input" type="text" name="childAadharNumber" value={child.childAadharNumber} onChange={(e) => handleChildChange(index, e)} />
                  </Col>
                  <Col md={3} className="section-heading-col">
                    <label className="form-label">{`Child ${index + 1} Age`}</label><br />
                    <input className="form-label-input" type="text" name="childAge" value={child.childAge} onChange={(e) => handleChildChange(index, e)} />
                  </Col>
                  <Col md={3} className="section-heading-col">
                    <label className="form-label">{`Child ${index + 1} Date of Birth`}</label><br />
                    <input className="form-label-input" type="text" name={`dobChild${index + 1}`} value={child.dobChild} onChange={(e) => handleChildChange(index, e)} />
                  </Col>
        
                  <Col className="d-flex justify-content-end align-items-center">
                    <FaTrash className="text-danger cursor-pointer" onClick={() => handleDeleteChild(index)} />
                  </Col>
                </Row>
              ))}
            </div>
          );
        
      case 'Qualification':
        return (
          <>
          <div className="form-container">
            <center> <h1 className="section-heading">Qualification</h1></center>
            <div>
            <center><p className = "personal-dtls-sub-heading">Under Graduation Details</p></center>
            </div>
            <Row>
              <Col>
                <label className="form-label">Under Graduate Degree</label><br />
                <input disabled = {disableFields} className="form-label-input" placeholder='e.g. Bachelor of Technology' type="text" name="employeeId" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input disabled = {disableFields} className="form-label-input" placeholder='e.g. Computer Science' type="text" name="employeeId" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="officialEmail" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label> <br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="phone" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="alternativeContact" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="personalEmail" />
              </Col>
            </Row>
            <div>
              <center><p className = "personal-dtls-sub-heading">Post Graduation Details</p></center>
            </div>
            <Row>
              <Col>
                <label className="form-label">Post Graduate Degree</label><br />
                <input disabled = {disableFields} className="form-label-input" placeholder='e.g. M.Tech' type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label><br />
                <input  disabled = {disableFields} className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <div>
            <center><p className = "personal-dtls-sub-heading">Additional Education (if applicable)</p></center>
            </div>
            <Row>
              <Col>
                <label className="form-label">PhD/Doctorate Degree</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">Field of Study</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">College/University</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label">Start Year</label><br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="permanentAddress" />
              </Col>
              <Col>
                <label className="form-label">End Year(Actual/Expected)</label><br />
                <input  disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
              <Col>
                <label className="form-label">Grade/Percentage</label><br />
                <input  disabled = {disableFields} className="form-label-input" type="text" name="currentAddress" />
              </Col>
            </Row>
          </div>
          <div className="exp-confirmation">
              <input  disabled = {disableFields} className="form-label-input" type='checkbox' checked = {qualificationData.havePriorExp} onChange={handleCheckboxChange}/>
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
                <label className="form-label"><span className="required">*</span>Account Number</label><br />
                <input disabled = {disableFields} className={`form-label-input ${acNumberErr? 'error-border' : ''}`} type="text" name="acNumber" onChange={handleBankDetailsData} value = {acNumber} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>IFSC Code</label> <br />
                <input disabled = {disableFields} className={`form-label-input ${ifscCodeErr? 'error-border' : ''}`}  type="text" name="ifscCode" onChange={handleBankDetailsData} value={ifscCode} />
              </Col>
              <Col>
                <label className="form-label"><span className="required">*</span>Name as per A/C</label><br />
                <input disabled = {disableFields} className={`form-label-input ${nameAsPerBankErr? 'error-border' : ''}`} type="text" name="nameAsPerBank" onChange={handleBankDetailsData}  value={nameAsPerBank}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-label"><span className="required">*</span>Branch</label> <br />
                <input disabled = {disableFields} className={`form-label-input ${branchNameErr? 'error-border' : ''}`}    type="text" name="branchName" onChange={handleBankDetailsData} value={branchName} />
              </Col>
              <Col>
                <label className="form-label">UAN</label> <br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="uan" onChange={handleBankDetailsData} value={uan} />
              </Col>
              <Col>
                <label className="form-label">PF</label> <br />
                <input disabled = {disableFields} className="form-label-input" type="text" name="pfNumber" onChange={handleBankDetailsData} value={pfNumber} />
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
        <h1 className="welcome-text">Welcome to Appx</h1>
        <div className="personal-details-logout" onClick={logOutFromTheApplication}>
          <img src={logoutIcon} alt="Logout" className="personal-details-logout-icon" />
          <span>Log out</span>
        </div>
      </div>
      <div className="personal-details-body" style={{ backgroundImage: `url(${contentBg})` }}>
        <div className="personal-details-content">
          <ProgressBar progress={progress} />
          <div className="form-card">
            {renderForm()}
          </div>
          <div className="button-container">
          <Button className='save-button' onClick={onSaveButtonClick}>Save</Button> 
           {subMenuInfo.subMenu !== 'Bank Details' ? 
           
           <Button className='next-button' onClick={onNextButtonClick}>Next</Button> : null }
          
            {subMenuInfo.subMenu === 'Bank Details' ? 
            <Button className='next-button' onClick={onSubmitButtonClick}>Submit</Button> : null
             }
          </div>
        </div>
      </div>
      <AlertMessage
        isSuccess={alertObj.isSuccess}
        isWarning={alertObj.isWarning}
        isFailure={alertObj.isFailure}
        alertTitle={alertObj.title}
        alertMsg={alertObj.message}
      />
    </div>
  );
};

export default PersonalDetails;
