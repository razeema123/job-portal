import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateJob.css";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company || !location) {
      toast.warning("⚠️ Please fill all fields!");
      return;
    }

    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const newJob = { id: Date.now(), title, company, location };
    const updatedJobs = [...existingJobs, newJob];
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    toast.success("✅ Job added successfully!", {
      position: "top-right",
      autoClose: 1500,
    });

    setTitle("");
    setCompany("");
    setLocation("");

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
            <label>Job Title</label>
            <input
              placeholder="e.g. Frontend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Company</label>
            <input
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <label>Location</label>
            <input
              placeholder="e.g. Remote / New York"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button type="submit">✅ Add Job</button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
