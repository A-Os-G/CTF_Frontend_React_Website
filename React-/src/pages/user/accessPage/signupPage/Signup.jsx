import React, { useState } from 'react';
import './signup.css'
import Button from '../../../../components/ui/Button';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Signup() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const payload = {
            username: form.username,
            email: form.email,
            password: form.password,
            role: "ROLE_USER" // or the selected role
        };

        try {
            const response = await axios.post('http://localhost:8080/api/user/register', payload, { withCredentials: true });

            if (response.data.status !== "SUCCESS") {
                setError(response.data.message || 'Registration failed');
            } else {
                setSuccess('Registration successful! You can now log in.');
                setForm({ username: '', email: '', password: '', confirmPassword: '' });
            }
        } catch (err) {
            setError('Server error');
        }
    };

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
                {/* Social signup buttons under header */}
                <div className="social-signup" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                    <a href="http://localhost:8080/oauth2/authorization/google">
                        <img src="/images/google.png" alt="Sign up with Google" />
                    </a>
                    <a href="http://localhost:8080/oauth2/authorization/github">
                        <img src="/images/github_Footer.png" alt="Sign up with GitHub" />
                    </a>
                </div>
                {/* Error and success messages under header */}
                {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '0.5rem' }}>{error}</div>}
                {success && <div className="success-message" style={{ color: 'green', textAlign: 'center', marginBottom: '0.5rem' }}>{success}</div>}
                <form className="inputs" onSubmit={handleSubmit}>
                    <div className='inputbox name'>
                        <img src="/images/login_username.png" alt="" />
                        <input
                            placeholder='Name'
                            type='text'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            required
                        />  
                    </div>
                    <div className='inputbox email'>
                        <img src="/images/login_email.png" alt="" />
                        <input
                            placeholder='Email'
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />  
                    </div>
                    <div className='inputbox password'>
                        <img src="/images/login_password.png" alt="" />
                        <input
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />  
                    </div>
                    <div className='inputbox conf-password'>
                        <img src="/images/login_password.png" alt="" />
                        <input
                            placeholder='Confirm Password'
                            type='password'
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />  
                    </div>
                    <Link to='/login'>Already Have an account?</Link>
                    <div className="signup-button">
                        <Button name="Signup" type="submit" />
                    </div>
                </form>
            </div>    
        </div>
        </>
     );
}

export default Signup;