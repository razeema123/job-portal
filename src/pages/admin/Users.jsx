import React, { useState, useEffect } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

 export function Sidebar() {
  
  
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/jobrequests", label: "Jobs", icon: "💼" }
  ];

  return (
    <aside
      style={{
        width: "250px",
        background: "linear-gradient(135deg, #0a1725 0%, #1a2332 100%)",
        color: "white",
        padding: "0",
        height: "100vh",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ padding: "30px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>Admin Panel</h2>
      </div>
      
      <nav style={{ padding: "20px 0" }}>
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: location.pathname.includes(item.path.split('/').pop()) ? "#4ade80" : "rgba(255,255,255,0.8)",
              textDecoration: "none",
              padding: "12px 20px",
              margin: "5px 10px",
              borderRadius: "8px",
              background: location.pathname.includes(item.path.split('/').pop()) ? "rgba(74, 222, 128, 0.1)" : "transparent",
              borderLeft: location.pathname.includes(item.path.split('/').pop()) ? "3px solid #4ade80" : "3px solid transparent",
              transition: "all 0.3s ease"
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>{item.label}</span>
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

// Smart pagination display logic
const getPageNumbers = () => {
  const pages = [];
  
  if (totalPages <= 7) {
    // If total pages is 7 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    if (currentPage <= 4) {
      // If current page is in the beginning (1-4)
      // Show: 1 2 3 4 5 ... 10
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // If current page is near the end
      // Show: 1 ... 6 7 8 9 10
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is in the middle
      // Show: 1 ... 4 5 6 ... 10
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }
  
  return pages;
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

        <div style={{ 
  marginTop: "20px", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "flex-end",
  gap: "5px" 
}}>
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    style={{ 
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#f0f0f0",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
      opacity: currentPage === 1 ? 0.5 : 1
    }} 
  >
    Prev
  </button>

  {getPageNumbers().map((page, index) => 
    page === '...' ? (
      <span 
        key={`ellipsis-${index}`}
        style={{ 
          padding: "8px 4px",
          color: "#666",
          userSelect: "none"
        }}
      >
        ...
      </span>
    ) : (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        style={{
          padding: "8px 12px",
          background: currentPage === page ? "#0a1725ff" : "#f0f0f0",
          color: currentPage === page ? "#fff" : "#000",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
          minWidth: "40px"
        }}
      >
        {page}
      </button>
    )
  )}

  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages || totalPages === 0}
    style={{ 
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      background: "#f0f0f0",
      cursor: (currentPage === totalPages || totalPages === 0) ? "not-allowed" : "pointer",
      opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1
    }}
  >
    Next
  </button>
</div>
      </div>
    </div>
  );
}
