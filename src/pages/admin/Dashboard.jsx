import React from "react";
import ProgressGraph from "../../components/ProgressGraph";
import "./Dashboard.css";
 

export default function Dashboard() {
   
     return (
         <div className=" dashboard-page">
 
     
      <ProgressGraph />
    </div>
  );

  function Sidebar() {
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
        <a href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</a>
        <a href="/analytics" style={{ color: "white", textDecoration: "none" }}>Analytics</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Jobs</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Settings</a>
      </nav>
    </aside>
  );
}

}
