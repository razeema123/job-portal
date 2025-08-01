import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/recruiter/SideBar";
import Navbar from "../components/recruiter/Navbar"; 
import "./UserApplications.css";

export default function UserApplications() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");

  const applications = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", resume: "alice_resume.pdf", status: "Pending" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", resume: "bob_resume.pdf", status: "Reviewed" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", resume: "carol_resume.pdf", status: "Shortlisted" },
    { id: 4, name: "David Miller", email: "david@example.com", resume: "david_resume.pdf", status: "Pending" },
    { id: 5, name: "Anitha Sharma", email: "anitha@example.com", resume: "anitha_resume.pdf", status: "Shortlisted" },
    { id: 6, name: "Ethan Brown", email: "ethan@example.com", resume: "ethan_resume.pdf", status: "Pending" },
  ];

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  const handleRowClick = (id) => {
    navigate(`/view-user/${id}`);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar /> {}

        {}
        <div className="status-analytics">
          {["All", "Pending", "Reviewed", "Shortlisted"].map((status) => (
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

        {}
        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">No applications found.</td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} onClick={() => handleRowClick(app.id)}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>
                      <a href={`/${app.resume}`} download className="resume-link">Download</a>
                    </td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
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
