import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./postjob.css";
import Sidebar from "../components/recruiter/SideBar";
import Navbar from "../components/recruiter/Navbar";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

export default function PostJob() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch jobs from backend
  useEffect(() => {
    axios
      .get("https://job-portal-backend-1-wore.onrender.com/api/jobs")
      .then((response) => {
        setJobs(response.data.jobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load jobs");
      });
  }, []);

  const handleRowClick = (id) => {
    navigate(`/ViewApplications/${id}`);
  };

  const openDeleteModal = (e, id) => {
    e.stopPropagation();
    setJobToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      axios
        .delete(`https://job-portal-backend-1-wore.onrender.com/api/jobs/delete/${jobToDelete}`)
        .then(() => {
          setJobs(jobs.filter((job) => job._id !== jobToDelete));
          toast.success("Job deleted successfully!");
        })
        .catch(() => {
          toast.error("Failed to delete job");
        });

      setShowModal(false);
      setJobToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/editjob/${id}`);
  };

  // ✅ Toggle individual selection
  const toggleJobSelection = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  // ✅ Delete selected jobs
  const handleDeleteSelected = async () => {
    if (selectedJobs.length === 0) {
      toast.warning("No jobs selected for deletion");
      return;
    }

    try {
      await axios.post("https://job-portal-backend-1-wore.onrender.com/api/jobs/delete-multiple", {
        ids: selectedJobs,
      });
      toast.success(`${selectedJobs.length} jobs deleted`);
      setJobs(jobs.filter((job) => !selectedJobs.includes(job._id)));
      setSelectedJobs([]);
    } catch (err) {
      toast.error("Failed to delete selected jobs");
      console.error(err);
    }
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
        <Navbar />

        <div className="post-job-header">
          <Link to="/createjob" className="create-job-btn">
            + Create Job
          </Link>
          {selectedJobs.length > 0 && (
            <button className="delete-selected-btn" onClick={handleDeleteSelected}>
              Delete Selected ({selectedJobs.length})
            </button>
          )}
        </div>

        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs posted yet.</p>
        ) : (
          <table className="jobs-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedJobs(jobs.map((job) => job._id));
                      } else {
                        setSelectedJobs([]);
                      }
                    }}
                    checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  />
                </th>
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
              {jobs.map((job) => (
                <tr key={job._id} className="clickable-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job._id)}
                      onChange={() => toggleJobSelection(job._id)}
                    />
                  </td>
                  <td onClick={() => handleRowClick(job._id)}>{job.title}</td>
                  <td onClick={() => handleRowClick(job._id)}>{job.company}</td>
                  <td onClick={() => handleRowClick(job._id)}>{job.location}</td>
                  <td onClick={() => handleRowClick(job._id)}>{job.jobType}</td>
                  <td onClick={() => handleRowClick(job._id)}>₹{job.salary}</td>
                  <td
  className="description-cell"
  title={job.description} // Tooltip to see full text on hover
  onClick={() => handleRowClick(job._id)}
>
  {job.description}
</td>

                  <td className="action-cell">
                    <button onClick={(e) => handleEdit(e, job._id)} title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={(e) => openDeleteModal(e, job._id)} title="Delete">
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
