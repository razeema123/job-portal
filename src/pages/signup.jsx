import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email, password }));
    toast.success('Account created successfully! Please login to continue.');
    setTimeout(() => {
      navigate('/login');
    }, 2000); // wait 2 seconds before navigating
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <img src="/src/2754-Photoroom.png" alt="Signup Illustration" />
      </div>
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Signup</button>
          <div className="auth-links">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Signup;
