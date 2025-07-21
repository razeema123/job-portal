import React, { useState } from 'react';
import './findjob.css';
import { AiFillHome } from 'react-icons/ai';

import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase } from 'react-icons/fa';

import { FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => (
  <header className="site-header">
   <FaBriefcase className="logo-icon" />
    <nav>
      <a href="/home"><AiFillHome /> Home</a>
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


const jobsData = [
  {
    title: 'Fresher Software testing intern',
    company: 'UST Global',
    location: 'Kochi, Kerala',
    
    salary: '₹9,000 – ₹15,000 a month',
    type: ['Full-time', 'Work from home', 'Monday to Friday'],
  },
  {
    title: 'Fresher IT Software Engineer',
    company: 'wipro',
    location: 'Kochi, Kerala',
    salary: '₹9,000 – ₹15,000 a month',
    type: ['Work from home'],
    },
    {
        title: 'Fresher IT Software Engineer',
        company: 'facebook',
        location: 'Kochi, Kerala',
        salary: '₹9,000 – ₹15,000 a month',
        type: ['Work from home'],
    },
    {
        title: 'QA Engineer',
        company: 'google',
        location: 'Kottayam, Kerala',
        salary: '₹9,000 – ₹15,000 a month',
        type: ['Full-time', 'Work from home', 'Monday to Friday'],
    },
    {
        title: 'developer',
        company: 'Amazon',
        location: 'Banglore, karnataka',
        salary: '₹9,000 – ₹15,000 a month',
        type: ['Full-time', 'Work from home', 'Monday to Friday'],
    },
    {
        title: 'software tester',
        company: 'microsoft',
        location: 'banglore, Karnataka',
        salary: '₹9,000 – ₹15,000 a month',
        type: ['Full-time', 'Work from home', 'Monday to Friday'],
    },
      
      
  {
    title: 'Software Tester',
    company: 'techsolutions',
    location: ' Kochi, Kerala',
    salary: '₹18,000 – ₹30,000 a month',
    type: [],
  },
];

const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  const handleApply = (job) => {
    navigate('/apply', { state: { job } });
  };
  
    return (
      <>
      <Header />
    <div className="jobs-page">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Jobs for you</h2>

      {filteredJobs.map((job, index) => (
        <div className="job-card" key={index}>
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
<p className="location">📍 {job.location}</p>

          <div className="job-tags">
            <span className="tag salary">{job.salary}</span>
            {job.type.map((item, i) => (
              <span className="tag" key={i}>{item}</span>
            ))}
          </div>
          <div className="apply-row">
  <span className="apply" onClick={() => handleApply(job)}>
    📩 <strong>Easily apply</strong>
  </span>
          </div>
        </div>
      ))}
    </div>
      </>
  );
};

export default FindJobs;
