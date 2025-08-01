import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./postjob.css";
import Sidebar from "../components/recruiter/SideBar";
import Navbar from "../components/recruiter/Navbar"; 
import { FaTrash, FaEdit } from "react-icons/fa";


export default function PostJob() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleRowClick = (index) => {
    navigate(`/ViewApplications/${index}`);
  };

  const openDeleteModal = (e, index) => {
    e.stopPropagation();
    setJobToDelete(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete !== null) {
      const updatedJobs = [...jobs];
      updatedJobs.splice(jobToDelete, 1);
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      toast.success("Job deleted successfully!");
    }
    setShowModal(false);
    setJobToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  const handleEdit = (e, index) => {
    e.stopPropagation();
    navigate(`/ViewApplications/${index}?editMode=true`);
  };

  return (
    <div className="layout">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Reusable Top Navbar */}
        <Navbar />

        {/* Header with Create Job Button */}
        <div className="post-job-header">
          <Link to="/createjob" className="create-job-btn">
            + Create Job
          </Link>
        </div>

        {/* Job Table */}
        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs posted yet.</p>
        ) : (
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Salary</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="clickable-row">
                  <td onClick={() => handleRowClick(index)}>{job.title}</td>
                  <td onClick={() => handleRowClick(index)}>{job.company}</td>
                  <td onClick={() => handleRowClick(index)}>{job.location}</td>
                  <td onClick={() => handleRowClick(index)}>{job.type}</td>
                  <td onClick={() => handleRowClick(index)}>{job.salary || "N/A"}</td>
                  <td onClick={() => handleRowClick(index)}>{job.description}</td>
                  <td className="action-cell">
                    <button onClick={(e) => handleEdit(e, index)} title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={(e) => openDeleteModal(e, index)} title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this job?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
