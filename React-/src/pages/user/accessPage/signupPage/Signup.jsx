import React from 'react';
import './signup.css'
import Button from '../../../../components/ui/Button';
import {Link} from 'react-router-dom'

function Signup() {
    return ( 
        <>

        <div className="signup-Section">

            <div className="image-Side">
                <img src="/images/Login_image.jpg" alt="" />
            </div>
        
            <div className="input-Side">
        
                <div className="signup-header">
                    <h1>SIGNUP</h1>
                </div>

                <div className="inputs">

                    <div className='inputbox name'>
                        <img src="/images/login_username.png" alt="" />
                        <input placeholder='Name' type='name'></input>  
                    </div>

                    <div className='inputbox email'>
                        <img src="/images/login_email.png" alt="" />
                        <input placeholder='Email' type='email'></input>  
                    </div>

                    <div className='inputbox password'>
                        <img src="/images/login_password.png" alt="" />
                        <input placeholder='Password' type='password'></input>  
                    </div>

                    <div className='inputbox conf-password'>
                        <img src="/images/login_password.png" alt="" />
                        <input placeholder='Confirm Password' type='password'></input>  
                    </div>

                    <Link to='/login'>Already Have an account?</Link>

                </div>
                <div className="signup-button">
                    <Button name="Signup" address="#"/>
                </div>
            </div>    
        </div>
        </>
     );
}

export default Signup;