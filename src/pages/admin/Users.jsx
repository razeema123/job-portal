 import React, { useState } from "react";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Pending" },
    { id: 3, name: "Michael Lee", email: "michael@example.com", role: "Viewer", status: "Active" },
  ]);

  const [sortKey, setSortKey] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // For View modal

  // Add new user via prompt
  const handleAddUser = () => {
    const name = prompt("Enter name:");
    const email = prompt("Enter email:");
    const role = prompt("Enter role (Admin, Editor, Viewer):");
    const status = "Pending";

    if (name && email && role) {
      const newUser = {
        id: users.length + 1,
        name,
        email,
        role,
        status,
      };
      setUsers([...users, newUser]);
    }
  };

  // Sort users
  const handleSort = (key) => {
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setUsers(sortedUsers);
  };

  // Accept user
  const handleAccept = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: "Active" } : user
    ));
  };

  // Reject user
  const handleReject = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: "Rejected" } : user
    ));
  };

  // View user details
  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="users-page">
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

      {/* Modal for viewing user */}
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
  );
}
