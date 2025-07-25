import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';
 
import Dashboard from "./pages/dashboard.jsx";
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
import JobRequests from './pages/jobrequests.jsx';
import Jobseekers from './pages/jobrequests.jsx';
 

 
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
import Home from './pages/home.jsx';  
import FindJobs from './findjob.jsx';
import ForgotPassword from './forgott.jsx';
import ApplyJob from './applyjob.jsx';
import CreateJob from './applications/createjob.jsx';
import PostJob from './applications/postjob.jsx';
import ViewApplications from './applications/ViewApplications.jsx';
import ViewProfile from './pages/viewprofile.jsx';
import JobDetail from './jobdetails.jsx';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Sidebar />} />
        <Route path="admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/progressgraph" element={<ProgressGraph />} />
        <Route path="/admin/adminlayout" element={<AdminLayout />} />
 
       <Route path="/admin/jobrequests" element={<JobRequests />} />
       <Route path="/admin/jobseekers" element={<Jobseekers/>} /> 
 
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/postjob" element={<PostJob/>}/>
        <Route path="/createjob" element={<CreateJob/>}/>
        <Route path="/viewapplications" element={<ViewApplications/>}/>
        <Route path="/viewapplications/:jobId" element={<ViewApplications />} />


        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
      

 

 
      </Routes>
    </Router>
  );
}

export default App;
