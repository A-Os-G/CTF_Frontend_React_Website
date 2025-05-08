import React from 'react';
import './login.css'
import Button from '../../../../components/ui/Button';
import {Link} from 'react-router-dom'

function Login() {
    return ( 
        <>

        <div className="login-Section">

            <div className="login-image-Side">
                <img src="/images/Login_image.jpg" alt="" />
            </div>
        
            <div className="login-input-Side">
        
                <div className="login-header">
                    <h1>Login</h1>
                </div>

                <div className="login-inputs">


                    <div className='inputbox email'>
                        <img src="/images/login_email.png" alt="" />
                        <input placeholder='Email' type='email'></input>  
                    </div>

                    <div className='inputbox password'>
                        <img src="/images/login_password.png" alt="" />
                        <input placeholder='Password' type='password'></input>  
                    </div>

                    <div className="routing">
                        <Link to='/#'>Forget My Password?</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>

                </div>
                <div className="login-button">
                    <Button name="Login" address="#"/>
                </div>
            </div>    
        </div>
        </>
     );
}

export default Login;