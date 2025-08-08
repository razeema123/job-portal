import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './applyjob.css';
import { AiFillHome } from 'react-icons/ai';
import { MdPostAdd } from 'react-icons/md';
import { FaBriefcase, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';

const Header = () => (
  <header className="site-header">
    <FaBriefcase className="logo-icon" />
    <nav>
      <a href="/home"><AiFillHome /> <span>Home</span></a>
      <a href="/find-jobs"><FaSearch /><span> Find Jobs</span></a>
      <a href="/postjob"><MdPostAdd /> <span>Post Jobs</span></a>
      <a href="/login"><FiLogOut /> <span>Logout</span></a>
    </nav>
  </header>
);

const ApplyJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  const [job, setJob] = useState(null);
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    relocate: '',
    resume: null,
    reason: '',
  });

  useEffect(() => {
    if (jobId) {
      axios.get(`http://localhost:5002/api/jobs/${jobId}`)
        .then(res => setJob(res.data))
        .catch(err => console.error("Failed to fetch job:", err));
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("education", formData.education);
      data.append("experience", formData.experience);
      data.append("relocate", formData.relocate);
      data.append("resume", formData.resume);
      data.append("reason", formData.reason);

      await axios.post(`http://localhost:5002/api/applications/${jobId}/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/user-applications');
      }, 3000);
    } catch (err) {
      console.error("❌ Failed to submit application:", err);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (!job) return <p>Loading job details...</p>;

  return (
    <>
      <Header />
      <div className="apply-job-page">
        <h2>Apply for: {job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Type:</strong> {Array.isArray(job.type) ? job.type.join(', ') : job.jobType}</p>

        <form className="apply-form" onSubmit={handleSubmit} encType="multipart/form-data">
          {step === 1 && (
            <>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} required />
              <input type="text" name="experience" placeholder="Work Experience" value={formData.experience} onChange={handleChange} required />
              <select name="relocate" value={formData.relocate} onChange={handleChange} required>
                <option value="">Ready to Relocate?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div>
                <button type="button" onClick={prevStep}>Back</button>{' '}
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
              <textarea name="reason" placeholder="Why should we hire you?" value={formData.reason} onChange={handleChange} required />
              <div>
                <button type="button" onClick={prevStep}>Back</button>{' '}
                <button type="submit">Submit Application</button>
              </div>
            </>
          )}
        </form>

        {showToast && <div className="toast">✅ Application submitted successfully!</div>}
      </div>
    </>
  );
};

export default ApplyJob;
