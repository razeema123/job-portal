import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => (
  <header className="site-header">
   <FaBriefcase className="logo-icon" />
    <nav>
      <a href=""><AiFillHome /> Home</a>
      <a href="/find-jobs"><FaSearch /> Find Jobs</a>
      <a href="/recruiter"><MdPostAdd /> Post Jobs</a>
      <a href="/login"><FiLogOut /> Logout</a>
    </nav>
  </header>
);

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
