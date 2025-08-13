import React from "react";
import { useNavigate } from "react-router-dom";

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

export default function AddUser() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/admin/users");  

  };
  
return (
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />
  
 
    <div style={{ padding: "20px" }}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Role:</label>
          <select>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <button type="submit">Save User</button>
      </form>
    </div>
    </div>
  );
}
