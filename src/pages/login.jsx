import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      toast.success('Login successful');
      setTimeout(() => navigate('/home'), 1500);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="auth-illustration">
        <img src="/src/rag-doll-red-word-career-Photoroom (1).png" alt="Job Logo" className="job-logo" />
        <h1 className="auth-title">Welcome to Job Portal</h1>
        <img src="/src/2754-Photoroom.png" alt="Login Illustration" className="illustration" />
      </div>

      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span className="separator"></span>
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
