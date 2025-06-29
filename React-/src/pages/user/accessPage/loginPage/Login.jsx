import React, { useState } from 'react';
import './login.css'
import Button from '../../../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../../Routes/AuthProvider"; // adjust path as needed

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Modal state for forget password
    const [showForgetModal, setShowForgetModal] = useState(false);
    const [forgetEmail, setForgetEmail] = useState('');
    const [forgetMsg, setForgetMsg] = useState('');
    const [forgetLoading, setForgetLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useAuth();

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
            // Fetch user profile after login
            const res = await axios.get('http://localhost:8080/api/user/me', { withCredentials: true });
            setUser(res.data.response); // update context
            navigate('/challenge');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    // Modal submit handler
    const handleForgetSubmit = async (e) => {
        e.preventDefault();
        setForgetMsg('');
        setForgetLoading(true);
        try {
            await axios.post('http://localhost:8080/api/user/auth/forgot-password', { email: forgetEmail });
            setForgetMsg('A reset link has been sent.');
        } catch (err) {
            // Show backend error message if available
            const msg =
                err.response?.data?.response ||
                err.response?.data?.message ||
                'Failed to send reset email.';
            setForgetMsg(msg);
        } finally {
            setForgetLoading(false);
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
                {/*
                <div className="social-signup" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                    <a href="http://localhost:8080/oauth2/authorization/google">
                        <img src="/images/google.png" alt="Login with Google" />
                    </a>
                    <a href="http://localhost:8080/oauth2/authorization/github">
                        <img src="/images/github_Footer.png" alt="Login with GitHub" />
                    </a>
                </div>
                */}
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
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <img
                            src="/images/Password.png"
                            alt="Toggle visibility"
                            className="toggle-password"
                            onClick={() => setPasswordVisible(prev => !prev)}
                        />
                    </div>

                    <div className="routing">
                        <button
                            type="button"
                            className="forget-password-link-modal"
                            onClick={() => setShowForgetModal(true)}
                        >
                            Forget My Password?
                        </button>
                        <Link to='/signup'>Signup</Link>
                    </div>
                    <div className="login-button">
                        <Button name={loading ? "Logging in..." : "Login"} type="submit" disabled={loading} />
                    </div>
                </form>
            </div>
        </div>

        {/* Forget Password Modal */}
        {showForgetModal && (
            <div className="forget-modal-overlay">
                <div className="forget-modal-content">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleForgetSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={forgetEmail}
                            onChange={e => setForgetEmail(e.target.value)}
                            required
                            className="forget-modal-input"
                        />
                        <div className="forget-modal-actions">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForgetModal(false);
                                    setForgetMsg('');
                                    setForgetEmail('');
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" disabled={forgetLoading}>
                                {forgetLoading ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                    {forgetMsg && <div className="forget-modal-message">{forgetMsg}</div>}
                </div>
            </div>
        )}
        </>
     );
}

export default Login;