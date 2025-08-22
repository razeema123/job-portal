 import React from "react";
import { useNavigate } from "react-router-dom";
import "./adduser.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/users">Users</a>
        <a href="/admin/jobrequests">Jobs</a>
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
    <div className="add-user-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Centered form container */}
      <div className="form-wrapper">
        <div className="add-user-form">
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
              <label>Password:</label>
              <input type="password" required />
            </div>
            <div>
              <label>Role:</label>
              <select>
                <option>Admin</option>
                <option>Recruiter</option>
                
              </select>
            </div>
            <button type="submit">Save User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
