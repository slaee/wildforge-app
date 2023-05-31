import './Login.scss';
import logo from '../../../Images/WFLogo.png';
import InputBox from '../../../Utils/Input/InputBox.js';
import Button from '../../../Utils/Button/FilledButton.js';

function Login() {
    
  return (
    <div className='Login-container'>
        <div className='Logo-container'>
            <img src={logo} alt='WildForge Logo' />
            <h1>WildForge</h1>
        </div>

        <div className='Login-form'>
            <h2>Email</h2>
            <InputBox/>
            <h2>Password</h2>
            <InputBox/>
            <div className='Login-row'>
                <label>
                    <input type='checkbox' />
                    Remember Me
                </label>
                <a href='#'>Forgot Password</a>
            </div>

            <Button label='Sign in' />
            <label>
                <h3>Don't have an account?</h3>
                <a href='#'>Sign up</a>
            </label>
            
        </div>

    </div>
  );
}

export default Login;
