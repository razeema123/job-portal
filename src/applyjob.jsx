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
    interviewDate: ''
  });

  if (!job) return <p>Job details not found.</p>;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    console.log(formData);
   
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

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
