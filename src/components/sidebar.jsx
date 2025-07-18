import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
