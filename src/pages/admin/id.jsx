 import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  
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
        height: "170vh",
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

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const user = location.state || {
    id,
    name: "Unknown User",
    email: "No email provided",
    role: "N/A",
    status: "N/A",
    password: "********",
    joinDate: "2024-01-15",
    lastLogin: "2024-12-30",
    avatar: null
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return '#10b981';
      case 'inactive': return '#f59e0b';
      case 'banned': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return '#8b5cf6';
      case 'user': return '#3b82f6';
      case 'moderator': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      
      <div style={{ flex: 1, padding: "30px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              color: "#6b7280",
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            ← Back to Users
          </button>
          
          <h1 style={{ 
            margin: "0", 
            fontSize: "28px", 
            fontWeight: "700", 
            color: "#1f2937" 
          }}>
            User Profile
          </h1>
          <p style={{ 
            margin: "5px 0 0 0", 
            color: "#6b7280", 
            fontSize: "16px" 
          }}>
            View and manage user information
          </p>
        </div>

        {/* Profile Card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          overflow: "hidden"
        }}>
          {/* Profile Header */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
                color: "white",
                border: "3px solid rgba(255,255,255,0.3)"
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h2 style={{ 
                  color: "white", 
                  margin: "0 0 5px 0", 
                  fontSize: "24px",
                  fontWeight: "600"
                }}>
                  {user.name}
                </h2>
                <p style={{ 
                  color: "rgba(255,255,255,0.9)", 
                  margin: "0", 
                  fontSize: "16px" 
                }}>
                  {user.email}
                </p>
              </div>
            </div>
            
            <div style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              display: "flex",
              gap: "10px"
            }}>
              <span style={{
                background: getStatusColor(user.status),
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase"
              }}>
                {user.status}
              </span>
              <span style={{
                background: getRoleColor(user.role),
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase"
              }}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div style={{ padding: "40px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px"
            }}>
              {/* Personal Information */}
              <div>
                <h3 style={{
                  color: "#1f2937",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Personal Information
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      User ID
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: "#1f2937",
                      fontFamily: "monospace",
                      background: "#f3f4f6",
                      padding: "8px 12px",
                      borderRadius: "6px"
                    }}>
                      #{user.id}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Full Name
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: "#1f2937" 
                    }}>
                      {user.name}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Email Address
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: "#1f2937" 
                    }}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 style={{
                  color: "#1f2937",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Account Information
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Role
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: getRoleColor(user.role),
                      fontWeight: "600"
                    }}>
                      {user.role}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Account Status
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: getStatusColor(user.status),
                      fontWeight: "600"
                    }}>
                      {user.status}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Password
                    </label>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      marginTop: "5px"
                    }}>
                      <span style={{ 
                        fontSize: "16px", 
                        color: "#1f2937",
                        fontFamily: "monospace"
                      }}>
                        {showPassword ? user.password : "••••••••"}
                      </span>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          background: "transparent",
                          border: "1px solid #d1d5db",
                          color: "#6b7280",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#6b7280", 
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Member Since
                    </label>
                    <p style={{ 
                      margin: "5px 0 0 0", 
                      fontSize: "16px", 
                      color: "#1f2937" 
                    }}>
                      {user.joinDate || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

             
              
              
              
             
          </div>
        </div>
      </div>
    </div>
  );
}