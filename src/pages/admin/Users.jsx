import React, { useState, useEffect } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
 
export default function Users() {
  const [users, setUsers] = useState([]);
  const [sortKey, setSortKey] = useState("");     
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // show 5 users per page
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:5002/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleAddUser = () => {
    navigate("/admin/adduser");
  };

  // Sorting
  const handleSort = (key) => {
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) =>
      (a[key] || "").localeCompare(b[key] || "")
    );
    setUsers(sortedUsers);
  };

  // Accept / Reject
   

   

  const handleView = (user) => {
    navigate(`/admin/users/${user._id}`, { state: user });
  };

 const handleBlockToggle = async (id) => {
  try {
    await axios.put(`http://localhost:5002/api/users/block/${id}`);
    // refresh list after updating
    const res = await axios.get("http://localhost:5002/api/users");
    setUsers(res.data);
  } catch (err) {
    console.error("Error blocking/unblocking:", err);
  }
}


  // Search filter
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      (user.name || "").toLowerCase().includes(q) ||
      (user.email || "").toLowerCase().includes(q) ||
      (user.role || "").toLowerCase().includes(q)
    );
  });


   

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Manage Users</h1>

        <div className="users-controls">
          <button className="add-btn" onClick={handleAddUser}>Add User</button>

          <input
            type="text"
            placeholder="Search by name, email, or role"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            style={{
              marginLeft: "10px",
              padding: "8px",
              marginRight: "1000px",
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

        {/* Users Table */}
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  
                  <td>
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                      onClick={() => handleView(user)}
                    >
                      👁 View
                    </button>
                      
  <button
    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition ml-2"
    onClick={() => handleBlockToggle(user._id)}
    disabled={user.isBlocked} // disable if already blocked
  >
    Block
  </button>
  <button
    className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-green-600 transition ml-2"
    onClick={() => handleBlockToggle(user._id)}
    disabled={!user.isBlocked} // disable if already active
  >
    Unblock
  </button>
 


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

        {/* Pagination Controls */}
        <div style={{ marginTop: "20px", display: "flex", alignItems: "right", gap: "5px", float: "right"}}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ padding: "5px 10px" }} 
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              style={{
                padding: "5px 10px",
                background: currentPage === i + 1 ? "#0a1725ff" : "#f0f0f0",
                color: currentPage === i + 1 ? "#fff" : "#000",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{ padding: "5px 10px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
