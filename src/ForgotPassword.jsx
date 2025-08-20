import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword({ onOtpSent }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email"); // short immediate error toast
      return;
    }

    // create one loading toast and keep its id
    const toastId = toast.loading("Sending OTP...");

    try {
      setLoading(true);

      // call backend
      await axios.post('https://job-portal-backend-1-wore.onrender.com/api/auth/forgot-password', { email });

      // update the SAME toast to success (no new toast)
      toast.update(toastId, {
        render: "OTP has been sent to your email!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onOtpSent?.(email);

      // redirect after a short delay so user sees the toast
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 900);

    } catch (err) {
      console.error(err);

      // update the SAME toast to error (no new toast)
      toast.update(toastId, {
        render: "Failed to send OTP. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <p className="back-to-login">
        <a href="/login">← Back to Login</a>
      </p>
    </form>
  );
}
