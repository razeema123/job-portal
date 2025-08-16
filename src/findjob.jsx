import React, { useState, useRef, useEffect } from 'react';
import './findjob.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ role }) => {
  const navigate = useNavigate();
  return (
    <header className="site-header">
      <FaBriefcase
        className="logo-icon"
        onClick={() => navigate('/home')}
        style={{ cursor: 'pointer' }}
      />
      <nav>
        <a href="/home"><AiFillHome /> <span>Home</span></a>
        <a href="/find-jobs"><FaSearch /> <span>Find Jobs</span></a>

        {/* ✅ Show Post Jobs only for recruiter or admin */}
        {(role === 'recruiter' || role === 'admin') && (
          <a href="/postjob"><MdPostAdd /><span> Post Jobs</span></a>
        )}

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

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // ✅ Get role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // ✅ Fetch jobs from backend
  useEffect(() => {
    axios.get('http://localhost:5002/api/jobs')
      .then(res => {
        setJobs(res.data.jobs);
      })
      .catch(err => {
        console.error('❌ Failed to fetch jobs:', err);
      });
  }, []);

  // Focus animation for search bar
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

  // ✅ Apply filter + sort
  const filteredJobs = jobs
    .filter((job) => (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((job) => selectedType === 'All' || job.jobType === selectedType)
    .sort((a, b) => {
      const companyA = a.company || '';
      const companyB = b.company || '';
      const salaryA = a.salary || 0;
      const salaryB = b.salary || 0;

      if (sortOption === 'company-asc') return companyA.localeCompare(companyB);
      if (sortOption === 'company-desc') return companyB.localeCompare(companyA);
      if (sortOption === 'salary-asc') return salaryA - salaryB;
      if (sortOption === 'salary-desc') return salaryB - salaryA;

      return 0;
    });

  const handleViewDetails = (job) => {
    navigate(`/job/${job._id}`);
  };

  return (
    <div className="layout">
      <Header role={role} />
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
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
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
              filteredJobs.map((job) => (
                <div
                  className="job-card clickable-job"
                  key={job._id}
                  onClick={() => handleViewDetails(job)}
                >
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <p className="location">📍 {job.location}</p>
                  <div className="job-tags">
                    <span className="tag salary">₹{job.salary}</span>
                    <span className="tag">{job.jobType}</span>
                  </div>
                  <div className="apply-row">
                    <span
                      className="apply"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/apply?jobId=${job._id}`);
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
};

export default FindJobs;
