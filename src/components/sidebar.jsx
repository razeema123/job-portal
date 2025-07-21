  import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", profit: 4000, expense: 2400 },
  { month: "Feb", profit: 3000, expense: 1398 },
  { month: "Mar", profit: 5000, expense: 2500 },
  { month: "Apr", profit: 4780, expense: 2908 },
  { month: "May", profit: 5890, expense: 3000 },
  { month: "Jun", profit: 4390, expense: 2600 },
  { month: "Jul", profit: 6490, expense: 3200 },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>

      </div>
  );
}

export default Sidebar;
