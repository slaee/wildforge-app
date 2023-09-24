import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import './Signup.scss';

function Signup() {
  const [showDetailsForm, setShowDetailsForm] = useState(true);
  const [showEmailAndPassword, setShowEmailAndPassword] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setShowDetailsForm(false);
  };

  const toggleEmailAndPasswordForm = () => {
    setShowEmailAndPassword(false);
  };

  const renderNameInputs = () => (
    <>
      <div className="d-flex flex-column">
        <span className="fs-5 fw-bold pt-2 pb-2">First Name</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column pt-3 pb-3">
        <span className="fs-5 fw-bold pb-2">Last Name</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="d-grid gap-4 pt-3 pb-3">
        <button
            type="button"
            className="btn btn-wild-primary btn-large fw-bold fs-5"
            onClick={toggleEmailAndPasswordForm}
        >
            Sign Up as Student
        </button>
        <button
            type="button"
            className="btn btn-wild-secondary btn-large fw-bold fs-5"
            onClick={toggleEmailAndPasswordForm}
        >
            Sign Up as Teacher
        </button>
        </div>
        <div className="d-flex justify-content-center pt-3 pb-3">
            <span className="fs-5">
                Already have an account? <a href="/" className="redirect-text">Login</a>
            </span>
        </div>
    </>
  );

  const renderEmailAndPasswordInputs = () => (
    <>
      <div className="d-flex flex-column">
        <span className="fs-5 fw-bold pt-2 pb-2">Email</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column pt-2 pb-2">
        <span className="fs-5 fw-bold pt-2 pb-2">Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column pt-2 pb-2">
        <span className="fs-5 fw-bold pt-2 pb-2">Confirm Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="d-grid gap-4 pt-3 pb-2">
        <button
            type="button"
            className="btn btn-wild-primary btn-large fw-bold fs-5"
            onClick={toggleForm}
        >
            Sign Up
        </button>
        </div>
        <div className="d-flex justify-content-start pt-3 pb-3">
            <a className="fs-5 redirect-text" href='/'>
                Go Back
            </a>
        </div>
    </>
  );

  return (
    <>
      {showDetailsForm ? (
        <>
          <div className="app-name">
            <span className="wild fs-3 fw-bold">Wild</span>
            <span className="fs-3 fw-bolder">FORGE</span>
          </div>
          <div className="login-container">
            <div className="login-form">
              <span className="fs-3 fw-bold pb-2">Sign Up</span>
              {showEmailAndPassword ? (
                <>
                  {renderNameInputs()}
                  
                </>
              ) : (
                <>
                  {renderEmailAndPasswordInputs()}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
            <div class="d-grid bg-wild">
                <span>Please verify your email by checking your inbox. If you haven't received an email, please click{' '}
                    <a href="/">Resend</a>
                </span>
            </div>
        </> 
      )}
    </>
  );
}

export default Signup;