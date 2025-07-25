import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Jobdetails.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

// Header Component
const Header = () => (
  <header className="site-header">
    <FaBriefcase className="logo-icon" />
    <nav>
      <a href="/home"><AiFillHome /> <span>Home</span></a>
      <a href="/find-jobs"><FaSearch /> <span>Find Jobs</span></a>
      <a href="/recruiter"><MdPostAdd /> <span>Post Jobs</span></a>
      <a href="/login"><FiLogOut /> <span>Logout</span></a>
    </nav>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="site-footer">
    <p>&copy; 2025 Job Portal. All rights reserved.</p>
  </footer>
);

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  if (!job) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>Job not found</h2>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="job-detail-wrapper">
        <div className="job-detail-container">
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Type:</strong> {job.type.join(', ')}</p>
          <p><strong>Bond:</strong> {job.bond || "Not specified"}</p>
          <p><strong>Description:</strong></p>
          <p>{job.description || "No description provided. This is a great opportunity to grow with the company, work in a collaborative environment, and contribute to innovative products.We are looking for a passionate and detail-oriented individual to join our growing team as a key contributor to our organization. In this role, you will be responsible for managing day-to-day tasks, collaborating with cross-functional teams, and driving forward innovative solutions that enhance productivity and business outcomes. You’ll work in a fast-paced environment where initiative, critical thinking, and problem-solving skills are highly valued.The ideal candidate is self-motivated, eager to learn, and capable of handling multiple responsibilities while maintaining high-quality standards. This position offers ample opportunities for growth, learning, and career advancement, as you will be encouraged to take ownership of your work and contribute to meaningful projects.You will be part of a supportive and inclusive team that values collaboration, creativity, and continuous improvement.Whether you're attending strategy meetings, coordinating with clients, or contributing to hands-on project work, your input will directly impact our company’s success and client satisfaction. "}</p>

          <button className="apply-btn" onClick={() => navigate('/apply', { state: { job } })}>
            Apply Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetail;
