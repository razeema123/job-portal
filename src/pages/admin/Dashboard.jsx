import React from "react";
import ProgressGraph from "../../components/ProgressGraph";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <ProgressGraph />
    </div>
  );
}
