 import React from "react";
import { useNavigate } from "react-router-dom";
import "./adduser.css";

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
