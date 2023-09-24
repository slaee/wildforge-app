import React from 'react'
import { InputText } from 'primereact/inputtext';
import './Login.scss'

function Login() {
  return (
    <>
      <div className='app-name'>
        <span class="wild fs-3 fw-bold">Wild</span><span class="fs-3 fw-bolder">FORGE</span>
      </div>
      <div className='login-container'>
      <div className='login-form'>
        <span class="fs-3 fw-bold pt-3 pb-3">Login</span>
        <div class="d-flex flex-column">
          <span class="fs-5 fw-bold pt-2 pb-2">Email</span>
          <InputText class="yellow-on-focus" type="text"/>
        </div>
        <div class="d-flex flex-column pt-3 pb-3">
          <span class="fs-5 fw-bold pt-2 pb-2">Password</span>
          <InputText class="yellow-on-focus" type="text"/>
          <a href="/" class="d-flex justify-content-end fs-5 redirect-text">Forgot Password</a>
        </div>
        <div class="d-grid gap-2 pt-3 pb-3">
          <button type="button" class="btn btn-wild-primary btn-large fw-bold fs-5">Login</button>
        </div>
        <div class="d-flex justify-content-center pt-3 pb-3">
          <span class="fs-5">Don't have an account? <a href="/" class="redirect-text">Sign Up</a></span>
        </div>
      </div>
      </div>
    </>
  )
}

export default Login