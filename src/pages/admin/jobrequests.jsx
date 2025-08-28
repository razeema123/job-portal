 import React, { useState } from "react";
import "./jobrequests.css";

// Sidebar Component
 export function Sidebar() {
   const menuItems = [
     { name: "Dashboard", link: "/admin/dashboard" },
     { name: "Users", link: "/admin/users" },
     { name: "Jobs", link: "/admin/jobrequests" },
   ];
 
   return (
     <aside
       style={{
         width: "240px",
         background: "#0a1725",
         color: "white",
         padding: "20px",
         height: "100vh",
         display: "flex",
         flexDirection: "column",
       }}
     >
       <h2 style={{ marginBottom: "40px", fontSize: "1.5rem" }}>⚙ Admin Panel</h2>
       <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
         {menuItems.map((item, idx) => (
           <a
             key={idx}
             href={item.link}
             style={{
               color: "white",
               textDecoration: "none",
               padding: "10px 15px",
               borderRadius: "8px",
               transition: "background 0.3s",
             }}
             onMouseEnter={(e) => (e.target.style.background = "#1e2a38")}
             onMouseLeave={(e) => (e.target.style.background = "transparent")}
           >
             {item.name}
           </a>
         ))}
       </nav>
     </aside>
   );
 } 

export default function JobRequests() {
  // Sample job requests data
  const [requests, setRequests] = useState([
    { id: 1, name: "Meera ts", jobTitle: "Frontend Developer", date: "2025-08-10", status: "Pending" },
    { id: 2, name: "jasmine p", jobTitle: "UI/UX Designer", date: "2025-08-08", status: "Pending" },
    { id: 3, name: "paul k", jobTitle: "Backend Developer", date: "2025-08-11", status: "Pending" }
  ]);

  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Job Requests</h2>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name, job, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
              width: "250px"
            }}
          />

          {/* Sort dropdown */}
          <div className="sort-section">
            <label>Sort By: </label>
            <select value={sortBy} onChange={(e) => sortRequests(e.target.value)}>
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
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
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.name}</td>
                  <td>{req.jobTitle}</td>
                  <td>{req.date}</td>
                  <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
                  <td className="space-x-2">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                      onClick={() => viewRequest(req)}
                    >
                      👁 View
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                      onClick={() => acceptRequest(req.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => rejectRequest(req.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                  ❌ No job requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
