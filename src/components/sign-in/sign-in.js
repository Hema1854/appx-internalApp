import React, { useState } from 'react';
import './sign-in.css';
import companyLogo from '../images/appx-logo.png';
import { useNavigate } from 'react-router-dom';
import { API_END_POINTS } from '../API-Constants';
import { useDispatch } from 'react-redux';
import { LoginInfoAction } from '../../Redux/Action/LoginInfoAction';


function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToSignUpPage = () => {
        navigate('/signup');
    }

    const handleSignIn = async () => {
        // navigate('/dashboard'); 
        try {
            const formData = {
                email: email,
                password: password
            };

            
            // const url = process.env.REACT_APP_URL + API_END_POINTS.login
            const url = "https://4voj6fn7d8.execute-api.us-east-1.amazonaws.com/dev/login"
            const response = await fetch (url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/dashboard');
                dispatch(LoginInfoAction(data));
                setError(data.message || 'Login failed');
            }
        
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
        }
    }

    return (
        <div className="signin-page-container">
            <div className="signin-image-section">
                <div className="text-container">
                    <h1 className="welcome-text">Nice to see you again</h1>
                    <h2 className="portal-text">EMPLOYEE PORTAL</h2>
                </div>
            </div>
            <div className="login-form-section">
                <img src={companyLogo} alt="Company Logo" className="company-logo-image" />
                <h2 className="login-title">Login Account</h2>
                <div className="signin-form">
                    <label className="label-style">Email</label>
                    <input
                        className="login-input-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <label className="label-style">Password</label>
                    <input
                        className="login-input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-button" type="button" onClick={handleSignIn}>LOG IN</button>
                    <p className="bottom-text">
                        Already a member? <span className="span-text-style" onClick={navigateToSignUpPage}>Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
