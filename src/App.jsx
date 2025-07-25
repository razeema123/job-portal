import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';
import Dashboard from "./pages/dashboard.jsx";
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
import JobRequests from './pages/jobrequests.jsx';
import Jobseekers from './pages/jobrequests.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;
