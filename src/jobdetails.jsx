import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Jobdetails.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Header = () => (
  <header className="site-header">
    <FaBriefcase className="logo-icon" />
    <nav>
      <a href="/home"><AiFillHome /> <span>Home</span></a>
      <a href="/find-jobs"><FaSearch /> <span>Find Jobs</span></a>
      <a href="/postjob"><MdPostAdd /> <span>Post Jobs</span></a>
      <a href="/login"><FiLogOut /> <span>Logout</span></a>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="site-footer">
    <p>&copy; 2025 Job Portal. All rights reserved.</p>
  </footer>
);

const JobDetail = () => {
  const { jobId } = useParams(); // ✅ match route param name
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch job from backend
  useEffect(() => {
    if (jobId) {
      axios.get(`http://localhost:5002/api/jobs/${jobId}`)
        .then((res) => {
          // ✅ handle both possible response formats
          setJob(res.data.job || res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch job:", err);
          setLoading(false);
        });
    }
  }, [jobId]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem' }}>Loading job details...</div>
        <Footer />
      </>
    );
  }

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
          <p><strong>Salary:</strong> ₹{job.salary}</p>
          <p><strong>Type:</strong> {Array.isArray(job.jobType) ? job.jobType.join(', ') : job.jobType}</p>
          <p><strong>Bond:</strong> {job.bond || "Not specified"}</p>
          <p><strong>Description:</strong> {job.description || "No description provided."}</p>
          
          {job.image && (
            <div className="job-image">
              <img src={`http://localhost:5002/uploads/${job.image}`} alt="Job" />
            </div>
          )}

          <button 
            className="apply-btn" 
            onClick={() => navigate(`/apply?jobId=${job._id}`)}
          >
            Apply Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetail;
