import React from "react";
import Sidebar from "../components/sidebar";
import ProgressGraph from "../components/progressgraph";
import "./AdminLayout.css";  
import weathercard from "../components/weather card"; // adjust path if needed

  <div className="dashboard-container">
  {/* Existing metric cards */}
  <div className="dashboard-card">...</div>
  <div className="dashboard-card">...</div>
  <div className="dashboard-card">...</div>

  {/* Weather widget */}
  <WeatherCard />
</div>


function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="graph-container">  
        <h1>Dashboard Overview</h1>
        <div className="dashboard-boxes">
          <div className="dashboard-box">
            <h3>Views</h3>
            <p>1,024</p>
          </div>
          <div className="dashboard-box">
            <h3>Job Applications</h3>
            <p>256</p>
          </div>
          <div className="dashboard-box">
            <h3>Accepted Proposals</h3>
            <p>87</p>
          </div>
        </div>
        <ProgressGraph />
      </div>
    </div>
  );
}

export default AdminLayout;
