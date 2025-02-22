import React, { useState } from 'react';
import './sign-up.css';
import { useNavigate } from 'react-router-dom';
import AlertPopup from '../AlertPopup/alert-popup';

function SignUpPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [alertPopupStatus, changeAlertPopupStatus] = useState(false);
    const [alertMessageObj, updateMessageObj] = useState({ icon: "", title: "", message: "", submitButtton: "", cancelButton: "", iconColor: "" });
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigateToSignInPage = () => {
        navigate('/signin');
    };

    

  const closeAlertPopup = () => {
    updateMessageObj({ icon: "", title: "", message: "", submitButtton: "", cancelButton: "", iconColor: "" });
    changeAlertPopupStatus(false);
  };

  const saveAlertPopupAction = () => {
    if (alertMessageObj.action === "Ok") {
      navigate('/signin');
      closeAlertPopup();
    }
  };

    const handleSignUpFields = (e) => {
        const { name, value } = e.target;
        setSignUpData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateFullName = () => {
        if (!signUpData.fullName) {
            setFullNameError('This field is mandatory');
        } else {
            setFullNameError('');
        }
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpData.email) {
            setEmailError('This field is mandatory');
        } else if (!emailPattern.test(signUpData.email) || !signUpData.email.endsWith('@app-xcelerate.com')) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        const password = signUpData.password;
        if (!password) {
            setPasswordError('This field is mandatory');
        } else if (password.length < 8 || password.length > 16) {
            setPasswordError('Password must be between 8-16 characters long');
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must include at least one uppercase letter');
        } else if (!/[a-z]/.test(password)) {
            setPasswordError('Password must include at least one lowercase letter');
        } else if (!/\d/.test(password)) {
            setPasswordError('Password must include at least one number');
        } else if (!/[@$!%*?&]/.test(password)) {
            setPasswordError('Password must include at least one special character');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (!signUpData.confirmPassword) {
            setConfirmPasswordError('This field is mandatory');
        } else if (signUpData.confirmPassword !== signUpData.password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSignUp = async () => {
        
        const { fullName, email, password, confirmPassword } = signUpData;
    
        // Perform validation checks
        let hasError = false;
    
        if (!fullName) {
            setFullNameError('This field is mandatory');
            hasError = true;
        } else {
            setFullNameError('');
        }
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('This field is mandatory');
            hasError = true;
        } else if (!emailPattern.test(email) || !email.endsWith('@app-xcelerate.com')) {
            setEmailError('Please enter a valid email');
            hasError = true;
        } else {
            setEmailError('');
        }
    
        if (!password) {
            setPasswordError('This field is mandatory');
            hasError = true;
        } else if (password.length < 8 || password.length > 16) {
            setPasswordError('Password must be between 8-16 characters long');
            hasError = true;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must include at least one uppercase letter');
            hasError = true;
        } else if (!/[a-z]/.test(password)) {
            setPasswordError('Password must include at least one lowercase letter');
            hasError = true;
        } else if (!/\d/.test(password)) {
            setPasswordError('Password must include at least one number');
            hasError = true;
        } else if (!/[@$!%*?&]/.test(password)) {
            setPasswordError('Password must include at least one special character');
            hasError = true;
        } else {
            setPasswordError('');
        }
    
        if (!confirmPassword) {
            setConfirmPasswordError('This field is mandatory');
            hasError = true;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }
    
        if (hasError) return;
    
        try {
            console.log('enterrrr');
            const formData = { fullName, email, password, confirmPassword };
            const response = await fetch('https://ek2mf3263f.execute-api.us-east-1.amazonaws.com/dev/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            if (response.ok) {
                
                updateMessageObj({
                    icon: 'fa fa-info',
                    title: 'Information',
                    message: "Please click on the email sent to your registered email within 24 hours to complete the registration process.",
                    submitButtton: "Ok",
                    cancelButton: "Close",
                    iconColor: "#f8af18",
                    action: "Ok",
                  });
                  changeAlertPopupStatus(true);
            } else {
                setError(data.message || 'Sign up failed');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setError('An error occurred during sign-up');
        }
    };
    

    return (
        <>
         <AlertPopup alertObj={alertMessageObj} openStatus={alertPopupStatus} saveAction={saveAlertPopupAction} buttonOrder={-1} cancelAction={closeAlertPopup} changeOpenStatus={closeAlertPopup} />
        <div className="signup-page-container">
            <div className="left-side-image-section">
                <div className="text-container">
                    <h1 className="welcome-text">Hey, Welcome to AppX</h1>
                </div>
            </div>
            <div className="signup-form-section">
                <h2 className="login-title">Sign Up</h2>
                <div className="signin-form">
                    <label className="signup-label-style">Full Name</label>
                    <input
                        className={`signup-login-input-field ${fullNameError ? 'error-border' : ''}`}
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={signUpData.fullName}
                        onChange={handleSignUpFields}
                        onBlur={validateFullName}
                        placeholder="Enter your full name"
                    />
                    {fullNameError && <p className="error-message">{fullNameError}</p>}
                    
                    <label className="signup-label-style" htmlFor="email">Email</label>
                    <input
                        className={`signup-login-input-field ${emailError ? 'error-border' : ''}`}
                        type="email"
                        id="email"
                        name="email"
                        value={signUpData.email}
                        onChange={handleSignUpFields}
                        onBlur={validateEmail}
                        placeholder="Enter your email"
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                    
                    <label className="signup-label-style" htmlFor="password">Password</label>
                    <input
                        className={`signup-login-input-field ${passwordError ? 'error-border' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleSignUpFields}
                        onBlur={validatePassword}
                        placeholder="Enter your password"
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    
                    <label className="signup-label-style" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className={`signup-login-input-field ${confirmPasswordError ? 'error-border' : ''}`}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleSignUpFields}
                        onBlur={validateConfirmPassword}
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <button className="signup-button" type="button" onClick={handleSignUp}>SIGN ME UP</button>
                    <p className="signup-bottom-text">
                        Already have an account? <span className="span-text-style" onClick={navigateToSignInPage}>Sign in</span>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUpPage;
