import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewJobs.css";

export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    toast.error("❌ Job deleted successfully!", {
      position: "top-right",
      autoClose: 1500,
    });
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
          <h2>Posted Jobs</h2>

          {jobs.length === 0 ? (
            <p className="no-jobs">❌ No jobs posted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>{index + 1}</td>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteJob(job.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
