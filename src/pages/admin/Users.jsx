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

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Pending" },
    { id: 3, name: "Michael Lee", email: "michael@example.com", role: "Viewer", status: "Active" },
  ]);

  const [sortKey, setSortKey] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
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
    setSelectedUser(user);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Manage Users</h1>

        <div className="users-controls">
          <button className="add-btn" onClick={handleAddUser}>➕ Add User</button>
           
          <select
            className="sort-select"
            value={sortKey}
            onChange={(e) => handleSort(e.target.value)}
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
            {users.length > 0 ? (
              users.map((user) => (
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
                    <button className="view-btn" onClick={() => handleView(user)}>👁 View</button>
                    <button className="accept-btn" onClick={() => handleAccept(user.id)}>✅ Accept</button>
                    <button className="reject-btn" onClick={() => handleReject(user.id)}>❌ Reject</button>
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

        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>User Details</h2>
              <p><b>ID:</b> {selectedUser.id}</p>
              <p><b>Name:</b> {selectedUser.name}</p>
              <p><b>Email:</b> {selectedUser.email}</p>
              <p><b>Role:</b> {selectedUser.role}</p>
              <p><b>Status:</b> {selectedUser.status}</p>
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
