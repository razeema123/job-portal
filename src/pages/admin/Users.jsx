 import React, { useState } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#0a1725ff",
        color: "white",
        padding: "20px",
        height: "110vh",
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

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "razeema r c", email: "john@example.com", role: "Admin", status: "Pending" },
    { id: 2, name: "shalu", email: "jane@example.com", role: "Editor", status: "Pending" },
    { id: 3, name: "Geethu p", email: "geethu@example.com", role: "Viewer", status: "Active" },
     { id: 4, name: "shyamala p", email: "shyam@example.com", role: "Viewer", status: "Active" },
      { id: 5, name: "paru p", email: "paru@example.com", role: "Viewer", status: "Active" },
      { id: 6, name: " tinu c", email: "tinuuu@example.com", role: "Admin", status: "Pending" },
      { id: 7, name: "teena t", email: "manu@example.com", role: "editor", status: "Pending" },
      { id: 8, name: "gopal p", email: "gopal@example.com", role: "editor", status: "Pending" },
      { id: 9, name: "varsha t", email: "varsha@example.com", role: "viewer", status: "Pending" },
      
  ]);

  const [sortKey, setSortKey] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/admin/adduser");
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setUsers(sortedUsers);
  };

  const handleAccept = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: "Active" } : user
    ));
  };

  const handleReject = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: "Rejected" } : user
    ));
  };

  const handleView = (user) => {
    navigate(`/admin/users/${user.id}`, { state: user });
  };

   
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.role.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Manage Users</h1>

        <div className="users-controls">
          <button className="add-btn" onClick={handleAddUser}>Add User</button>

          {/* ✅ Search bar */}
          <input
            type="text"
            placeholder="Search by name, email, or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          />

          <select
            className="sort-select"
            value={sortKey}
            onChange={(e) => handleSort(e.target.value)}
            style={{ marginLeft: "10px", padding: "8px" }}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="role">Role</option>
            <option value="status">Status</option>
          </select>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                   <button className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition" onClick={() => viewRequest(req)} > 👁 View </button> 
                   <button className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition" onClick={() => acceptRequest(req.id)} > Accept </button>
                    <button className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition" onClick={() => rejectRequest(req.id)} > Reject </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
