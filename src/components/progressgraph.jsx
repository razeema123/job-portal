 
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", profit: 4000, expense: 2400 },
  { month: "Feb", profit: 3000, expense: 1398 },
  { month: "Mar", profit: 5000, expense: 2500 },
  { month: "Apr", profit: 4780, expense: 2908 },
  { month: "May", profit: 5890, expense: 3000 },
  { month: "Jun", profit: 4390, expense: 2600 },
  { month: "Jul", profit: 6490, expense: 3200 },
];

function ProgressGraph() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Company Progress: Profit vs Expense</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis />
          <Tooltip />
          <Legend />  
          <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ff6b6b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressGraph;
