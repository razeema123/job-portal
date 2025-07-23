import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './applyjob.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

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

const ApplyJob = () => {
  const location = useLocation();
  const job = location.state?.job;
  const [showToast, setShowToast] = useState(false);

  if (!job) return <p>Job details not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // hide after 3s
    e.target.reset(); // optional: clear form fields
  };

  return (
    <>
      <Header />
      <div className="apply-job-page">
        <h2>Apply for: {job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Type:</strong> {job.type.join(', ')}</p>

        <form className="apply-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Why should we hire you?" required />
          <button type="submit">Submit Application</button>
        </form>

        {showToast && <div className="toast">✅ Application submitted successfully!</div>}
      </div>
    </>
  );
};

export default ApplyJob;

