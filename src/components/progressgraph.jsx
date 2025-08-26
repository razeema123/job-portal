 import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  LineChart,
  Line,
  Legend,
} from "recharts";

// ✅ Sidebar Component
function Sidebar() {
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
        height: "170vh",
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

// ✅ Header Component
function Header() {
  return (
    <header
      style={{
        background: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ fontSize: "1.3rem", fontWeight: "600" }}>Dashboard</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span>🔔</span>
        <span>👤 Admin</span>
      </div>
    </header>
  );
}

// ✅ Stats Cards Component
function StatsCards() {
  const stats = [
    { label: "Jobs Posted", value: 65, color: "#42A5F5" },
    { label: "Applications", value: 120, color: "#66BB6A" },
    { label: "Interviews", value: 40, color: "#FFA726" },
    { label: "Hired", value: 15, color: "#AB47BC" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            {stat.label}
          </h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: stat.color }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ✅ Progress Graph (Bar Chart)
function ProgressGraph() {
  const data = [
    { name: "Jobs Posted", value: 65 },
    { name: "Applications", value: 120 },
    { name: "Interviews", value: 40 },
    { name: "Hired", value: 15 },
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>
        📊 Job Portal Progress
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 50, right: 30 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#2E7D32" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{ borderRadius: "8px" }}
          />
          <Bar dataKey="value" fill="url(#barGradient)" barSize={25} radius={[5, 5, 5, 5]}>
            <LabelList dataKey="value" position="right" fill="#333" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ✅ Line Chart (Growth Trends)
function GrowthTrend() {
  const trendData = [
    { month: "Jan", applications: 40, hires: 5 },
    { month: "Feb", applications: 55, hires: 8 },
    { month: "Mar", applications: 70, hires: 12 },
    { month: "Apr", applications: 90, hires: 10 },
    { month: "May", applications: 120, hires: 15 },
    { month: "Jun", applications: 140, hires: 20 },
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>
        📈 Applications & Hires Trend
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{ borderRadius: "8px" }} />
          <Legend />
          <Line type="monotone" dataKey="applications" stroke="#42A5F5" strokeWidth={3} dot />
          <Line type="monotone" dataKey="hires" stroke="#66BB6A" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ✅ Main Dashboard Layout
export default function AdminDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fa" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, padding: "30px" }}>
          <StatsCards />
          <ProgressGraph />
          <GrowthTrend />
        </main>
      </div>
    </div>
  );
}
