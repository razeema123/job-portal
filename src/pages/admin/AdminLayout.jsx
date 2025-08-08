import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";
import Sidebar from "../../components/Sidebar.jsx";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="Sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/analytics">Analytics</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/settings">Settings</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
