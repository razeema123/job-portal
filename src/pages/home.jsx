import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch, FaBriefcase, FaUserCircle } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { BsPersonLinesFill } from 'react-icons/bs';

const Header = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
   
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <FaBriefcase className="logo-icon" />
      <nav>
  <a href="/"><AiFillHome /><span>Home</span></a>
  <a href="/find-jobs"><FaSearch /><span>Find Jobs</span></a>
  <a href="/recruiter"><MdPostAdd /><span>Post Jobs</span></a>

  <div className="profile-menu-wrapper" ref={profileRef}>
    <button className="profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
      <FaUserCircle /><span>Profile</span>
    </button>

    {showProfileMenu && (
      <div className="profile-popup">
        <button onClick={() => navigate('/view-profile')}>
          <BsPersonLinesFill /><span>View Profile</span>
        </button>
        <button onClick={handleLogout}>
          <FiLogOut /><span>Logout</span>
        </button>
      </div>
    )}
  </div>
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

  return (
    <>
      <Header />

      <div className="hero-container">
        <div className="hero-text">
          <h1><span>Unlock</span> Ambition</h1>
          <p>Apply to a plethora of hiring opportunities & work with your dream companies!</p>
          <div className="hero-buttons">
            <button className="find-btn" onClick={() => navigate('/find-jobs')}>Find Jobs</button>
            <button className="post-btn" onClick={() => navigate('/recruiter')}>+ Post Jobs</button>
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
