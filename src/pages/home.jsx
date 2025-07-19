import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

    return (
      
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
  );
};

export default Home;
