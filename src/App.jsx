import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';
import CreateJob from './pages/form/Createjob.jsx';
import ViewJobs from './view/ViewJobs.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recruiter/create" element={<CreateJob/>}/>
        <Route path="/recruiter/view" element={<ViewJobs/>}/>
       <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
