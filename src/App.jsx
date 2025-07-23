import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';
import ProgressGraph from './components/progressgraph.jsx';
import AdminLayout from "./pages/adminlayout.jsx";
 
import JobRequests from './pages/jobrequests.jsx';
  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Sidebar />} />
        <Route path="admin/dash" element={<h2>Welcome to Job Portal Dashboard</h2>} />
        <Route path="/admin/progressgraph" element={<ProgressGraph />} />
        <Route path="/admin/dashboard" element={<AdminLayout />} />
       <Route path="/admin/jobrequests" element={<JobRequests  />} /> 
             

      </Routes>
    </Router>
  );
}

export default App;
