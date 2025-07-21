import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateJob.css";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company || !location || !salary || !description) {
      toast.warning("⚠️ Please fill all fields!");
      return;
    }

    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      jobType,
      salary,
      description,
    };

    const updatedJobs = [...existingJobs, newJob];
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    toast.success("✅ Job added successfully!", {
      position: "top",
      autoClose: 1000,
    });

     
    setTitle("");
    setCompany("");
    setLocation("");
    setJobType("Full-time");
    setSalary("");
    setDescription("");

     
    setTimeout(() => {
      navigate("/recruiter/view");
    }, 1600);
  };

  return (
    <>
      {}
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/recruiter/create">➕ Create Job</Link>
          <Link to="/recruiter/view">📄 View Jobs</Link>
        </div>
      </nav>

      {}
      <div className="page-container">
        <div className="content-card">
          <h2>Create a New Job</h2>

          <form onSubmit={handleSubmit}>
            {}
            <label>Job Title</label>
            <input
              placeholder="e.g. Frontend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {}
            <label>Company</label>
            <input
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            {}
            <label>Location</label>
            <input
              placeholder="e.g. Remote / New York"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {}
            <label>Job Type</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            {}
            <label>Salary Range</label>
            <input
              placeholder="e.g. $50,000 - $70,000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            {}
            <label>Job Description</label>
            <textarea
              placeholder="Describe job responsibilities, requirements, etc."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">✅ Add Job</button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
