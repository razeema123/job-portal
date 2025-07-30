import React, { useState, useRef, useEffect } from 'react';

import './findjob.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <FaBriefcase className="logo-icon" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
      <nav>
        <a href="/home"><AiFillHome /> <span>Home</span></a>
        <a href="/find-jobs"><FaSearch /> <span>Find Jobs</span></a>
        <a href="/postjob"><MdPostAdd /><span> Post Jobs</span></a>
        <a href="/login"><FiLogOut /> <span>Logout</span></a>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <p>&copy; 2025 Job Portal. All rights reserved.</p>
  </footer>
);

const jobsData = [{
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
  const [selectedType, setSelectedType] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
      searchRef.current.classList.add('enlarged');

      const timer = setTimeout(() => {
        searchRef.current.classList.remove('enlarged');
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, []);

  
  const filteredJobs = jobsData
    .filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) =>
      selectedType === 'All' || job.type.includes(selectedType)
    )
    .sort((a, b) => {
      if (sortOption === 'company-asc') {
        return a.company.localeCompare(b.company);
      } else if (sortOption === 'company-desc') {
        return b.company.localeCompare(a.company);
      } else if (sortOption === 'salary-asc') {
        return parseInt(a.salary.replace(/\D/g, '')) - parseInt(b.salary.replace(/\D/g, ''));
      } else if (sortOption === 'salary-desc') {
        return parseInt(b.salary.replace(/\D/g, '')) - parseInt(a.salary.replace(/\D/g, ''));
      }
      return 0;
    });

  
  const handleViewDetails = (job) => {
    navigate(`/job/${job.title.replace(/\s+/g, '-').toLowerCase()}`, { state: { job } });
  };
  

  return (
    <div className="layout">
      <Header />
  
      <main className="main-content">
        <div className="jobs-page">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Job title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchRef}
            />
          </div>
  
          <div className="filter-sort-container">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Work from home">Work from home</option>
              <option value="Monday to Friday">Monday to Friday</option>
            </select>
  
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort By</option>
              <option value="company-asc">Company A-Z</option>
              <option value="company-desc">Company Z-A</option>
              <option value="salary-asc">Salary Low to High</option>
              <option value="salary-desc">Salary High to Low</option>
            </select>
          </div>
  
          <h2>Jobs for you</h2>
  
          <div className="job-list">
          {filteredJobs.length === 0 ? (
  <p>No jobs found.</p>
) : (
  filteredJobs.map((job, index) => (
    <div
  className="job-card clickable-job"
  key={index}
  onClick={() => handleViewDetails(job)}
>
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
    <span
      className="apply"
      onClick={(e) => {
        e.stopPropagation(); 
        navigate('/apply', { state: { job } })
      }}
    >
      📩 <strong>Easily apply</strong>
    </span>
  </div>
</div>


  ))
)}

          </div>
        </div>
      </main>
  
      <Footer />
    </div>
  );
}
export default FindJobs;
