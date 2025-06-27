import React, { useState } from 'react';
import './login.css'
import Button from '../../../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const payload = { email: form.email, password: form.password };
            await axios.post('http://localhost:8080/api/auth/login', payload, { withCredentials: true });
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/challenge');
            }, 1000);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

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
                {/* Social login buttons under header */}
                <div className="social-signup" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                    <a href="http://localhost:8080/oauth2/authorization/google">
                        <img src="/images/google.png" alt="Login with Google" />
                    </a>
                    <a href="http://localhost:8080/oauth2/authorization/github">
                        <img src="/images/github_Footer.png" alt="Login with GitHub" />
                    </a>
                </div>
                {/* Error and success messages under header */}
                {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '0.5rem' }}>{error}</div>}
                {success && <div className="success-message" style={{ color: 'green', textAlign: 'center', marginBottom: '0.5rem' }}>{success}</div>}
                <form className="login-inputs" onSubmit={handleSubmit}>
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
                    <div className="routing">
                        <Link to='/#'>Forget My Password?</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                    <div className="login-button">
                        <Button name={loading ? "Logging in..." : "Login"} type="submit" disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
        </>
     );
}

export default Login;