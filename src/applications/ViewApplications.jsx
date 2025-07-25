import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewApplications.css";

export default function ViewApplications() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({});

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (jobs[jobId]) {
      setJob(jobs[jobId]);
      setEditedJob(jobs[jobId]);
    } else {
      toast.error("❌ Job not found! Redirecting...");
      setTimeout(() => navigate("/postjob"), 2000);
    }
  }, [jobId, navigate]);

  const handleEditClick = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setEditedJob(job);
  };

  const handleSave = () => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs[jobId] = editedJob;
    localStorage.setItem("jobs", JSON.stringify(jobs));
    setJob(editedJob);
    setEditMode(false);
    toast.success("✅ Job updated successfully!");
  };

  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  if (!job) {
    return (
      <>
        <ToastContainer />
        <div className="content"><p>Loading...</p></div>
      </>
    );
  }

  return (
    <div className="layout">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Job Portal</h2>
        <ul className="sidebar-menu">
          <li><Link to="/postjob">Jobs</Link></li>
          <li><Link to="/createjob">Applications</Link></li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <div className="view-app-header">
          <h2>{job.title} – Applications</h2>

          {!editMode && (
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
          )}
        </div>

        {/* Job Details */}
        <div className="job-details-card">
          {editMode ? (
            <>
              <label>Job Title</label>
              <input type="text" name="title" value={editedJob.title} onChange={handleChange} />

              <label>Company</label>
              <input type="text" name="company" value={editedJob.company} onChange={handleChange} />

              <label>Location</label>
              <input type="text" name="location" value={editedJob.location} onChange={handleChange} />

              <label>Type</label>
              <select name="type" value={editedJob.type} onChange={handleChange}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              </select>

              <label>Salary</label>
              <input type="text" name="salary" value={editedJob.salary} onChange={handleChange} placeholder="Enter salary"/>


              <label>Description</label>
              <textarea name="description" value={editedJob.description} onChange={handleChange}></textarea>

              {/* Save/Cancel */}
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}> Save</button>
                <button className="cancel-btn" onClick={handleCancel}> Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Salary:</strong> {job.salary || "N/A"}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </>
          )}
          
        </div>

       
      </div>
    </div>
  );
}
