import React from "react";
import "./Analytics.css";

export default function Analytics() {
  return (
    <div className="analytics-page">
      <h1>Analytics Overview</h1>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Total Sales</h2>
          <p className="analytics-value">$12,340</p>
        </div>

        <div className="analytics-card">
          <h2>Active Users</h2>
          <p className="analytics-value">1,245</p>
        </div>

        <div className="analytics-card">
          <h2>Orders Today</h2>
          <p className="analytics-value">89</p>
        </div>
      </section>

      <section className="analytics-graph">
        <h2>Monthly Growth</h2>
        <div className="graph-placeholder">📊 Graph Placeholder</div>
      </section>
    </div>
  );
}
