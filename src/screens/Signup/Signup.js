import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import './Signup.scss';

function Signup() {
  const [showDetailsForm, setShowDetailsForm] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setShowDetailsForm(!showDetailsForm);
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
        <span className="fs-5 fw-bold pt-2 pb-2">Last Name</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
    </>
  );

  return (
    <>
      <div className="app-name">
        <span className="wild fs-3 fw-bold">Wild</span>
        <span className="fs-3 fw-bolder">FORGE</span>
      </div>
      <div className="login-container">
        <div className="login-form">
          <span className="fs-3 fw-bold pt-2 pb-2">Sign Up</span>
          {showDetailsForm ? (
            <>
              {renderNameInputs()}
              <div className="d-grid gap-4 pt-3 pb-3">
                <button
                  type="button"
                  className="btn btn-wild-primary btn-large fw-bold fs-5"
                  onClick={toggleForm}
                >
                  Sign Up as Student
                </button>
                <button
                  type="button"
                  className="btn btn-wild-secondary btn-large fw-bold fs-5"
                  onClick={toggleForm}
                >
                  Sign Up as Teacher
                </button>
              </div>
            </>
          ) : (
            <>
              {renderEmailAndPasswordInputs()}
              <div className="d-grid gap-4 pt-3 pb-2">
                <button
                  type="button"
                  className="btn btn-wild-primary btn-large fw-bold fs-5"
                  onClick={toggleForm}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {showDetailsForm ? (
            <div className="d-flex justify-content-center pt-3 pb-3">
              <span className="fs-5">
                Already have an account? <a href="/" className="redirect-text">Login</a>
              </span>
            </div>
          ) : (
            <div className="d-flex justify-content-start pt-3 pb-3">
              <a className="fs-5 redirect-text" onClick={toggleForm}>
                Go Back
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;