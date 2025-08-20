import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/recruiter/SideBar";
import Navbar from "../components/recruiter/Navbar"; 
import "./UserApplications.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios.get("https://job-portal-backend-1-wore.onrender.com/api/applications")
      .then((res) => setApplications(res.data))
      .catch(() => toast.error("Failed to load applications"));
  };

  const handleRowClick = (id) => {
    navigate(`/view-applications/${id}`);
  };

  const updateStatus = (id, status) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
  
    axios.patch(
      `https://job-portal-backend-1-wore.onrender.com/api/applications/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {
        toast.success(`Updated to ${status}`);
        fetchApplications(); // refresh
      })
      .catch(() => toast.error("Failed to update status"));
  };
  

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  return (
    <div className="layout">
      <ToastContainer position="top-right" autoClose={2000} />
      <Sidebar />
      <div className="content">
        <Navbar />

        {/* Analytics */}
        <div className="status-analytics">
          {["All", "applied", "shortlisted", "rejected"].map((status) => (
            <div
              key={status}
              className={`status-card ${status.toLowerCase()} ${selectedStatus === status ? "active" : ""}`}
              onClick={() => setSelectedStatus(status)}
            >
              <div className="status-label">{status}</div>
              <div className="status-count">
                {status === "All"
                  ? applications.length
                  : applications.filter((app) => app.status === status).length}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
             
                <th>Company</th>
                <th>Role</th>
                <th>Resume</th>
                <th>Status</th>
              
<th>Post</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No applications found.</td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app._id}>
                    <td onClick={() => handleRowClick(app._id)}>{app.name}</td>
                    <td onClick={() => handleRowClick(app._id)}>{app.email}</td>
                    <td>{app.jobId?.company || "N/A"}</td>
<td>{app.jobId?.title || "N/A"}</td>
                    <td>
                    <a href={`https://job-portal-backend-1-wore.onrender.com/${app.resumePath}`} target="_blank" rel="noreferrer" className="resume-link">

                        Download
                      </a>
                    </td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-approve" onClick={() => updateStatus(app._id, "shortlisted")}>Shortlist</button>
                      <button className="btn btn-reject" onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
