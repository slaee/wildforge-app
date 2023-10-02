import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import './index.scss';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Add your login logic here using the 'email' and 'password' state variables
    // For example, you can make an API request to authenticate the user.
  };

  return (
    <>
      <div className="app-name">
        <span className="wild fs-3 fw-bold">Wild</span>
        <span className="fs-3 fw-bolder">FORGE</span>
      </div>
      <div className="login-container">
        <div className="login-form">
          <span className="fs-3 fw-bold pb-3">Login</span>
          <div className="d-flex flex-column">
            <span className="fs-5 fw-bold pt-2 pb-2">Email</span>
            <InputText
              className="yellow-on-focus"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="d-flex flex-column pt-3 pb-3">
            <span className="fs-5 fw-bold pb-2">Password</span>
            <InputText
              className="yellow-on-focus"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Link
              to="/forgotpassword"
              className="d-flex justify-content-end fs-5 redirect-text"
            >
              Forgot Password
            </Link>
          </div>
          <div className="d-grid gap-2 pt-3 pb-3">
            <button
              type="button"
              className="btn btn-wild-primary btn-large fw-bold fs-5"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="d-flex justify-content-center pt-3 pb-3">
            <span className="fs-5">
              Don't have an account?{' '}
              <Link to="/signup" className="redirect-text">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
