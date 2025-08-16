import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch, FaBriefcase, FaUserCircle, FaBell } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { BsPersonLinesFill, BsSun, BsMoon } from 'react-icons/bs';
import axios from 'axios';

const Header = ({ toggleTheme, theme, role, onLogout }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch unread notifications count
  useEffect(() => {
    if (!userId || !token) return;
    axios.get(`http://localhost:5002/api/users/${userId}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUnreadCount(res.data.count))
    .catch(err => console.error("❌ Failed to fetch unread count", err));
  }, [userId, token]);

  return (
    <header className="site-header">
      <FaBriefcase className="logo-icon" />
      <nav>
        <a href="/"><AiFillHome /> <span>Home</span></a>
        <a href="/find-jobs"><FaSearch /> <span>Find Jobs</span></a>

        {/* Show 'Post Job' only to recruiters or admins */}
        {(role === 'recruiter' || role === 'admin') && (
          <a href="/postjob"><MdPostAdd /> <span>Post Jobs</span></a>
        )}

        {/* Notification Icon */}
        <a href="/notifications" className="notification-link" style={{ position: "relative" }}>
          <FaBell size={18} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px"
              }}
            >
              {unreadCount}
            </span>
          )}
        </a>

        <div className="profile-menu-wrapper" ref={profileRef}>
          <button className="profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUserCircle /> <span>Profile</span>
          </button>
          {showProfileMenu && (
            <div className="profile-popup">
              <button onClick={() => navigate('/view-profile')}>
                <BsPersonLinesFill /> View Profile
              </button>
              <button onClick={onLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <BsSun /> : <BsMoon />}
        </button>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <p>&copy; 2025 Job Portal. All rights reserved.</p>
  </footer>
);

const Home = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} role={role} onLogout={handleLogout} />

      <div className="hero-container">
        <div className="hero-text">
          <h1><span>Unlock</span> {name || 'Ambitions'}!</h1>
          <p>Apply to a plethora of hiring opportunities & work with your dream companies!</p>
          <div className="hero-buttons">
            <button className="find-btn" onClick={() => navigate('/find-jobs')}>Find Jobs</button>
            {(role === 'recruiter' || role === 'admin') && (
              <button className="post-btn" onClick={() => navigate('/postjob')}>+ Post Jobs</button>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/job-hiring-vacancy-team-interview-career-recruiting.jpg" alt="Job Opportunities" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
