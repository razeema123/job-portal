import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
