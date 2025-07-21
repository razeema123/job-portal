import React, { useState } from 'react';
import './forgott.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    // Simulate sending reset link (you can replace with actual logic)
    alert(`Reset link sent to ${email}`);
    setEmail('');
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="back-login" onClick={() => navigate('/login')}>
          &larr; Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
