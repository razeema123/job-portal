 import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './login.css'; 
 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://localhost:5002/api/auth/login",
      { email, password }
    );

    // ✅ Only runs if login succeeded (200 OK)
    const user = res.data.user;

    // Save valid login
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.id);

    // Navigate by role
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "recruiter") {
      navigate("/recruiter-dashboard");
    } else {
      navigate("/user-dashboard");
    }

    toast.success("Login successful!");
    setTimeout(() => navigate("/home"), 1500);

  } catch (err) {
    // ✅ This block runs if user is blocked, password wrong, etc.
    const status = err.response?.status;
    const errorMsg = err.response?.data?.message || "Login failed.";

    if (status === 403 && errorMsg.toLowerCase().includes("blocked")) {
      toast.error("Your account is blocked. Contact support.");
    } else {
      toast.error(errorMsg);
    }

    // Always clear storage on failed login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }
};

  return (
    <div className="auth-page">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="auth-illustration">
        <img
          src="/src/rag-doll-red-word-career-Photoroom (1).png"
          alt="Job Logo"
          className="job-logo"
        />
        <h1 className="auth-title">Welcome to Job Portal</h1>
        <img
          src="/src/2754-Photoroom.png"
          alt="Login Illustration"
          className="illustration"
        />
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
            <Link to="/signup">Don't have an account? Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
