 import React from "react";
import { useNavigate } from "react-router-dom";
import "./adduser.css";

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
