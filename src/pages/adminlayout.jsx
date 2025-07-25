  import React from "react";
import Sidebar from "../components/sidebar";
import ProgressGraph from "../components/progressgraph";
 
import WeatherCard from "../components/weather card";
import "./AdminLayout.css";
=======
import "./AdminLayout.css";  



 

 

const users = [
  { id: 1, name: "Revathi R.", email: "revathi@example.com", role: "Frontend Developer" },
  { id: 2, name: "Ajay Kumar", email: "ajay@example.com", role: "UI/UX Designer" },
  { id: 3, name: "Sneha S.", email: "sneha@example.com", role: "Backend Developer" },
];

function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="main-content">
        {/* Weather card in top-right corner */}
        <div className="weather-container">
          <WeatherCard />
        </div>

        <h3>Dashboard Overview</h3>

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
        {/* 👥 on the right corner */}
        <div className="user-container" align="right">
          <h3>👥 All Users</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}

export default AdminLayout;
