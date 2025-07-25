  import React from "react";
import { FaEye, FaBriefcase, FaCheckCircle, FaCloudSun } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:pl-60">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-56 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-xl font-bold text-blue-600 mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Job Listings</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Applications</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-60">
        <h1 className="text-2xl font-bold mb-6">Welcome, Admin 👋</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <FaEye className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-sm text-gray-500">Total Views</h2>
              <p className="text-xl font-semibold">12,345</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <FaBriefcase className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-sm text-gray-500">Job Applications</h2>
              <p className="text-xl font-semibold">875</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <FaCheckCircle className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-sm text-gray-500">Accepted Jobs</h2>
              <p className="text-xl font-semibold">98</p>
            </div>
          </div>
        </div>

        {/* Weather + Progress Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Card */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Current Weather</h3>
                <p className="text-2xl font-bold">28°C</p>
                <p className="text-sm">Sunny, Chennai</p>
              </div>
              <FaCloudSun className="text-5xl" />
            </div>
          </div>

          {/* Progress Graph Placeholder */}
          <div className="bg-white rounded-2xl p-6 shadow h-52 flex items-center justify-center text-gray-500 text-lg">
            {/* Replace this with your <ProgressGraph /> component */}
            Progress Graph (Profit vs Expense)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
