import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Login successful');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <img src="/src/4165379.jpg" alt="Login Illustration" />
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
