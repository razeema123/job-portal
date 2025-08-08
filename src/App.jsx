import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";


import Sidebar from './components/sidebar.jsx';
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
 
import CreateJob from './applications/createjob.jsx'; 
import Home from './pages/home.jsx';  
import FindJobs from './findjob.jsx';

import ForgotPassword from './forgott.jsx';
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




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/home" element={<ProtectedRoute role="user"><Home /></ProtectedRoute>} />
        <Route path="/find-jobs" element={<ProtectedRoute role="user"><FindJobs /></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute role="user"><ApplyJob /></ProtectedRoute>} />
        <Route path="/job/:jobId" element={<ProtectedRoute role="user"><JobDetail /></ProtectedRoute>} />
        <Route path="/view-profile" element={<ProtectedRoute role="user"><ViewProfile /></ProtectedRoute>} />

       <Route path="/postjob" element={<ProtectedRoute role="recruiter"><PostJob /></ProtectedRoute>} />
        <Route path="/createjob" element={<ProtectedRoute role="recruiter"><CreateJob /></ProtectedRoute>} />
        <Route path="/user-applications" element={<ProtectedRoute role="recruiter"><UserApplications /></ProtectedRoute>} />
        <Route path="/user-applications/:jobId" element={<ProtectedRoute role="recruiter"><UserApplications /></ProtectedRoute>} />
        <Route path="/editjob/:id" element={<ProtectedRoute role="recruiter"><EditJob /></ProtectedRoute>} />
        <Route path="/viewapplications" element={<ProtectedRoute role="recruiter"><ViewApplications /></ProtectedRoute>} />
        <Route path="/viewapplications/:jobId" element={<ProtectedRoute role="recruiter"><ViewApplications /></ProtectedRoute>} />
        <Route path="/recruiter-profile" element={<ProtectedRoute role="recruiter"><RecruiterProfile /></ProtectedRoute>} />
     

        <Route path="/admin" element={<Sidebar />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>} />
        <Route path="/admin/progressgraph" element={<ProtectedRoute role="admin"><ProgressGraph /></ProtectedRoute>} />
        <Route path="/admin/progressgraph" element={<ProtectedRoute role="admin"><ProgressGraph /></ProtectedRoute>} />
        <Route path="/view-user" element={ <ProtectedRoute role="admin"> <ViewUser /></ProtectedRoute>}/>  
        <Route path="/view-user/:id" element={ <ProtectedRoute role="admin"> <ViewUser /></ProtectedRoute>} />

       <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
        <Route path="/viewapplications/:jobId" element={<ViewApplications />} />
        <Route path="/user-appliations/:jobId" element={<UserApplications />} />


        <Route path="/view-user" element={<ViewUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/viewapplications/:id" element={<ViewApplications />} />
        <Route path="/view-applications/:id" element={<ViewApplications />} />
        <Route path="/job/:id" element={<JobDetail />} />



        {/* <Route path='/recruiter' element={<RecruiterProfile />} /> */}



       <Route path='/protected' element={<ProtectedRoute/>} />



                {/* Protected Routes */}
            {/* <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      /> */}


      </Routes>
    </Router>
  );
}

export default App;
