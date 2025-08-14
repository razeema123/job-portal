import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from "./pages/admin/Dashboard.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import Users from "./pages/admin/Users.jsx";
import Sidebar from "./components/Sidebar.jsx";
import CreateJob from './applications/createjob.jsx'; 
import Home from './pages/home.jsx';  
import FindJobs from './findjob.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ApplyJob from './applyjob.jsx';
import PostJob from './applications/postjob.jsx';
import ViewApplications from './applications/ViewApplications.jsx';
import ViewProfile from './pages/viewprofile.jsx';
import JobDetail from './jobdetails.jsx';
import UserApplications from './applications/UserApplications.jsx';
import ViewUser from './applications/ViewUser.jsx';
import RecruiterProfile from './applications/RecruiterProfile.jsx';
import EditJob from './applications/EditJob.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Unauthorized from './components/recruiter/Unauthorized.jsx';
import ResetPassword from "./ResetPassword.jsx";
import VerifyOtp from "./VerifyOtp.jsx";
import AddUser from "./pages/admin/addusers.jsx";
import ProgressGraph from "./components/progressgraph.jsx";
import Jobrequests from "./pages/admin/jobrequests.jsx"
import Notifications from "./pages/Notifications.jsx";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

 
      <Route path="/home" element={<ProtectedRoute role="user"><Home /></ProtectedRoute>} />
      <Route path="/find-jobs" element={<ProtectedRoute role="user"><FindJobs /></ProtectedRoute>} />
      <Route path="/apply" element={<ProtectedRoute role="user"><ApplyJob /></ProtectedRoute>} />
      <Route path="/job/:jobId" element={<ProtectedRoute role="user"><JobDetail /></ProtectedRoute>} />
      <Route path="/view-profile" element={<ProtectedRoute role="user"><ViewProfile /></ProtectedRoute>} />
      <Route path="/notifications" element={<Notifications />} />

 
      <Route path="/postjob" element={<ProtectedRoute role="recruiter"><PostJob /></ProtectedRoute>} />
      <Route path="/createjob" element={<ProtectedRoute role="recruiter"><CreateJob /></ProtectedRoute>} />
      <Route path="/user-applications" element={<ProtectedRoute role="recruiter"><UserApplications /></ProtectedRoute>} />
      <Route path="/user-applications/:jobId" element={<ProtectedRoute role="recruiter"><UserApplications /></ProtectedRoute>} />
      <Route path="/editjob/:id" element={<ProtectedRoute role="recruiter"><EditJob /></ProtectedRoute>} />
      <Route path="/viewapplications" element={<ProtectedRoute role="recruiter"><ViewApplications /></ProtectedRoute>} />
      <Route path="/viewapplications/:jobId" element={<ProtectedRoute role="recruiter"><ViewApplications /></ProtectedRoute>} />
      <Route path="/recruiter-profile" element={<ProtectedRoute role="recruiter"><RecruiterProfile /></ProtectedRoute>} />
      

 
       <Route path="/admin/adduser" element={<AddUser />} />

      <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>} />
      <Route path="/view-user" element={<ProtectedRoute role="admin"><ViewUser /></ProtectedRoute>} />
      <Route path="/view-user/:id" element={<ProtectedRoute role="admin"><ViewUser /></ProtectedRoute>} />

 
      {/* General */}
       
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/admin/users" element={<Users/>} />
       
      <Route path="/admin" element={<ProgressGraph/>} />
      <Route path="/admin/jobrequests" element={<Jobrequests/>} />

      <Route path="/viewapplications/:id" element={<ViewApplications />} />
 
      {/* Admin Pages */}
       
       

      {/* Misc Routes */}
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/viewapplications/:id" element={<ViewApplications />} />
      <Route path="/view-applications/:id" element={<ViewApplications />} />
      <Route path="/job/:id" element={<JobDetail />} />

      {/* Protected test route */}
      <Route path='/protected' element={<ProtectedRoute/>} />
 
    </Routes>
  );
}

export default App;
