import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';
 
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
 
import CreateJob from './pages/form/Createjob.jsx';
import ViewJobs from './view/ViewJobs.jsx';
 

import Home from './pages/home.jsx';  
import FindJobs from './findjob.jsx';
import ForgotPassword from './forgott.jsx';
import ApplyJob from './applyjob.jsx';
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
        <Route path="admin/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
        <Route path="/admin/progressgraph" element={<ProgressGraph />} />
        <Route path="/admin/adminlayout" element={<AdminLayout />} />
       

        <Route path="/recruiter/create" element={<CreateJob/>}/>
        <Route path="/recruiter/view" element={<ViewJobs/>}/>
       <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/apply" element={<ApplyJob />} />

        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
      

 

      </Routes>
    </Router>
  );
}

export default App;
