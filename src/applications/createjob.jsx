import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/recruiter/SideBar";
import "./createjob.css";
import axios from "axios";

export default function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "", // will map to backend's jobType
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload matching backend
    const jobData = {
      title: job.title.trim(),
      company: job.company.trim(),
      location: job.location.trim(),
      jobType: job.type, // backend expects jobType
      salary: job.salary ? Number(job.salary) : 0,
      description: job.description.trim(),
      recruiter: localStorage.getItem("userId"),
    };

    // Debug: check payload
    console.log("Submitting job:", jobData);

    // Check all required fields
    if (!jobData.title || !jobData.company || !jobData.location || !jobData.jobType || !jobData.description) {
      toast.error("All fields except salary are required");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // include if backend is protected
      await axios.post(
        "https://job-portal-backend-1-wore.onrender.com/api/jobs/create",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Job Created Successfully!", { autoClose: 2000 });
      setTimeout(() => navigate("/postjob"), 2000);
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong";
      toast.error("❌ " + msg, { autoClose: 3000 });
      console.error("Job creation error:", err);
    }
  };

  return (
    <div className="layout">
      <ToastContainer position="top" autoClose={2000} />
      <Sidebar />
      <div className="content">
        <div className="create-job-container">
          <h2>Create a New Job</h2>
          <form className="create-job-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="title" value={job.title} onChange={handleChange} placeholder="Eg: Frontend Developer" required />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input type="text" name="company" value={job.company} onChange={handleChange} placeholder="Eg: IBM" required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={job.location} onChange={handleChange} placeholder="Eg: Remote/New York" required />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select name="type" value={job.type} onChange={handleChange} required>
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input type="text" name="salary" value={job.salary} onChange={handleChange} placeholder="Optional" />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" value={job.description} onChange={handleChange} rows="4" placeholder="Enter your description" required />
            </div>

            <button type="submit" className="submit-btn">
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
