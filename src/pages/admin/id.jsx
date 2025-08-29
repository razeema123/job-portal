 import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";


export function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#0a1725ff",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    > 
      <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <a href="/admin/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</a>
        <a href="/admin/users" style={{ color: "white", textDecoration: "none" }}>Users</a>
        <a href="/admin/jobrequests" style={{ color: "white", textDecoration: "none" }}>Jobs</a>
      </nav>
    </aside>
  );
}

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

   
  const user = location.state || {
    id,
    name: "Unknown",
    email: "No email provided",
    role: "N/A",
    status: "N/A",
    password: "********"
  };


   

  return (
<div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <Sidebar />


    <div style={{ padding: "20px" }}>
      <h1>User Details</h1>
      <p><b>ID:</b> {user.id}</p>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Status:</b> </p>
      <p><b>Password:</b> {user.password ? "********" : "*******"}</p> {/* Masked */}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "15px",
          padding: "8px 15px",
          background: "#0a1725",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>
    </div>
     </div>
  );
}
