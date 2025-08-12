 import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Analytics from "./Analytics";
import "./AdminLayout.css";
 
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

export default function AdminLayout() {
  const location = useLocation();

  // Allow match even if URL has trailing slash or query params
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAnalytics = location.pathname.startsWith("/analytics");

  // Job Portal progress data
  const progressData = [
    { name: "Jobs Posted", value: 65 },
    { name: "Applications", value: 120 },
    { name: "Interviews", value: 40 },
    { name: "Hired", value: 15 },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {isDashboard && (
          <>
            <h1 className="page-title">Dashboard Overview</h1>

            {/* Progress Graph */}
            <div
              className="dashboard-widgets"
              style={{
                padding: "20px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ marginBottom: "20px" }}>Job Portal Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={progressData}
                  layout="vertical"
                  margin={{ left: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#4CAF50"
                    barSize={20}
                    radius={[5, 5, 5, 5]}
                  >
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {isAnalytics && <Analytics />}

        {/* Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
}
