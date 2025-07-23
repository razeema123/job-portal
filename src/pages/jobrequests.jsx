  import React, { useState } from "react";
import "./JobRequests.css";
import Sidebar from "../components/sidebar";  
const initialRequests = [
  {
    id: 1,
    name: "Revathi R.",
    jobTitle: "Frontend Developer",
    appliedDate: "2025-07-20",
    status: "Pending",
  },
  {
    id: 2,
    name: "Ajay Kumar",
    jobTitle: "UI/UX Designer",
    appliedDate: "2025-07-19",
    status: "Accepted",
  },
  {
    id: 3,
    name: "Sneha S.",
    jobTitle: "Backend Developer",
    appliedDate: "2025-07-18",
    status: "Rejected",
  },
];

function JobRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
  };

  const handleView = (request) => {
    alert(
      `Applicant: ${request.name}\nJob: ${request.jobTitle}\nApplied on: ${request.appliedDate}\nStatus: ${request.status}`
    );
  };

  return (
    <div className="job-requests-layout">
      <Sidebar /> {/* Sidebar on the left */}

      <div className="job-requests-main">
        <h2>All Job Requests</h2>
        <table className="job-requests-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Job Title</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.jobTitle}</td>
                <td>{request.appliedDate}</td>
                <td>
                  <span className={`status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <button className="view-btn" onClick={() => handleView(request)}>View</button>
                  <button className="accept-btn" onClick={() => handleStatusChange(request.id, "Accepted")}>Accept</button>
                  <button className="reject-btn" onClick={() => handleStatusChange(request.id, "Rejected")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobRequests;
