import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/chat');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error logging in');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" onChange={onChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};
export default Login;