import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext'; // Import InputText component
import './ForgotPassword.scss';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const toggleForm = () => {
    setShowPasswordForm(true); // Change this to true to show the email input form
    setResetPassword(false); // Reset the resetPassword state
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Handle the logic for resetting the password here.
    // You can add validation and make API requests as needed.
    // If successful, set resetPassword to true.
    // For demonstration, let's just set it to true after a delay.
    // setTimeout(() => {
    //   setResetPassword(true);
    // }, 2000); // Simulating a 2-second delay before showing the reset password form
    setResetPassword(true);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const renderEmailInput = () => (
    <>
      <div className="d-flex flex-column pt-4 pb-4">
        <span className="fs-5 fw-bold pt-2 pb-2">Email</span>
        <InputText
          className="yellow-on-focus"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="d-grid gap-2 pt-4 pb-4">
        <button
          type="button"
          className="btn btn-wild-primary btn-large fw-bold fs-5"
          onClick={handleResetPassword}
        >
          Forgot Password
        </button>
      </div>
      <div className="d-flex justify-content-start pt-3 pb-3">
        <a href="/" className="fs-5 redirect-text">
          Back to Login
        </a>
      </div>
    </>
  );

  const renderResetPassword = () => (
    <>
      <div className="d-flex flex-column pt-4 pb-4">
        <span className="fs-5 fw-bold pt-2 pb-2">New Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
      </div>
      <div className="d-flex flex-column pt-3 pb-3">
        <span className="fs-5 fw-bold pb-2">Confirm New Password</span>
        <InputText
          className="yellow-on-focus"
          type="password"
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
      </div>
      <div className="d-grid gap-2 pt-4 pb-4">
        <button
          type="button"
          className="btn btn-wild-primary btn-large fw-bold fs-5"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
      <div className="d-flex justify-content-start pt-3">
        <a href="/" className="fs-5 redirect-text">
          Back
        </a>
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
        <div className="form">
          <span className="fs-3 fw-bold pb-3">Forgot Password</span>
          {resetPassword ? renderResetPassword() : renderEmailInput()}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;