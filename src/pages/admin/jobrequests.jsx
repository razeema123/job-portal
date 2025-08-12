import React, { useState } from "react";
 import "./jobrequests.css";  // Optional CSS file for styling

export default function JobRequests() {
  // Sample job requests data
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", jobTitle: "Frontend Developer", date: "2025-08-10", status: "Pending" },
    { id: 2, name: "Alice Smith", jobTitle: "UI/UX Designer", date: "2025-08-08", status: "Pending" },
    { id: 3, name: "Michael Johnson", jobTitle: "Backend Developer", date: "2025-08-11", status: "Pending" }
  ]);

  const [sortBy, setSortBy] = useState("date");

  // Sorting functionality
  const sortRequests = (criteria) => {
    const sorted = [...requests].sort((a, b) => {
      if (criteria === "name") return a.name.localeCompare(b.name);
      if (criteria === "date") return new Date(b.date) - new Date(a.date);
      if (criteria === "status") return a.status.localeCompare(b.status);
      return 0;
    });
    setSortBy(criteria);
    setRequests(sorted);
  };

  // Accept request
  const acceptRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Accepted" } : req))
    );
  };

  // Reject request
  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  // View request details
  const viewRequest = (request) => {
    alert(
      `Name: ${request.name}\nJob Title: ${request.jobTitle}\nDate: ${request.date}\nStatus: ${request.status}`
    );
  };

  return (
    <div className="jobrequests-container">
      <div className="header">
        <h2>Job Requests</h2>
        <div className="sort-section">
          <label>Sort By: </label>
          <select value={sortBy} onChange={(e) => sortRequests(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <table className="jobrequests-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.jobTitle}</td>
              <td>{req.date}</td>
              <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
              <td>
                <button className="view-btn" onClick={() => viewRequest(req)}>View</button>
                <button className="accept-btn" onClick={() => acceptRequest(req.id)}>Accept</button>
                <button className="reject-btn" onClick={() => rejectRequest(req.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
