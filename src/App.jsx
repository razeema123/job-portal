import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';

 
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
 import AddUserForm from './pages/AddUserForm'; 
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




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
 
        <Route path="/admin" element={<Sidebar />} />
         <Route path="/add-user" element={<AddUserForm />} />
        <Route path="/admin/adminlayout" element={<AdminLayout />} />
       


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
        <Route path="/user-applications" element={<UserApplications />} />
        <Route path="/user-appliations/:jobId" element={<UserApplications />} />
        <Route path="/view-user" element={<ViewUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile/>} />


        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
      

 

      </Routes>
    </Router>
  );
}

export default App;
