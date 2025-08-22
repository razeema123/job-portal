 import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

 
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

export default function ProgressGraphWithSidebar() {
   
  const data = [
    { name: "Jobs Posted", value: 65 },
    { name: "Applications", value: 120 },
    { name: "Interviews", value: 40 },
    { name: "Hired", value: 15 },
  ];

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main style={{ flex: 1, padding: "20px" }}>
        
        <div className="progress-graph-container" style={{ padding: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Job Portal Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" barSize={20} radius={[5, 5, 5, 5]}>
                <LabelList dataKey="value" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
