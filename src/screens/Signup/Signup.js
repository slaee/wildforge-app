import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

import './index.scss';

function Signup() {
  const [step, setStep] = useState(1);
  const [showEmailVerification, setShowEmailVerification] = useState(false); // Set this to true to show the email verification message
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setShowEmailVerification(false);
    setStep(step + 1);
  };

  const prevStep = () => {
    setShowEmailVerification(false);
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    // You can access form data using the `formData` state
    // Redirect to a success page or show an error message based on the result
    // Redirect to success page for demonstration
    setShowEmailVerification(true);
  };

  const renderStep1 = () => (
    <>
      <div className="d-flex flex-column">
        <span className="fs-5 fw-bold pt-2 pb-2">First Name</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex flex-column pt-3 pb-3">
        <span className="fs-5 fw-bold pb-2">Last Name</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-grid gap-4 pt-3 pb-3">
        <button
          type="button"
          className="btn btn-wild-primary btn-large fw-bold fs-5"
          onClick={nextStep}
        >
          Sign Up as Student
        </button>
        <button
          type="button"
          className="btn btn-wild-secondary btn-large fw-bold fs-5"
          onClick={nextStep}
        >
          Sign Up as Teacher
        </button>
      </div>
      <div className="d-flex justify-content-center pt-3 pb-3">
        <span className="fs-5">
          Already have an account?{' '}
          <Link to="/login" className="redirect-text">
            Login
          </Link>
        </span>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="d-flex flex-column">
        <span className="fs-5 fw-bold pt-2 pb-2">Email</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex flex-column pt-2 pb-2">
        <span className="fs-5 fw-bold pt-2 pb-2">Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex flex-column pt-2 pb-2">
        <span className="fs-5 fw-bold pt-2 pb-2">Confirm Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-grid gap-4 pt-3 pb-2">
        <button
          type="button"
          className="btn btn-wild-primary btn-large fw-bold fs-5"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      <div className="d-flex justify-content-start pt-3 pb-3">
        <span className="fs-5 redirect-text" onClick={prevStep}>
          Go Back
        </span>
      </div>
    </>
  );

  const renderVerification = () => (
    <div className="d-grid bg-wild">
      <span>
        Please verify your email by checking your inbox. If you haven't received
        an email, please click <Link to="/signup">Resend</Link>
        {/* idk unsa dapat here @Sly */}
      </span>
    </div>
  );

  return (
    <>
      {showEmailVerification ? (
        renderVerification()
      ) : (
        <>
          <div className="app-name">
            <span className="wild fs-3 fw-bold">Wild</span>
            <span className="fs-3 fw-bolder">FORGE</span>
          </div>
          <div className="login-container">
            <div className="login-form">
              <span className="fs-3 fw-bold pb-2">Sign Up</span>
              {step === 1 ? renderStep1() : renderStep2()}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
