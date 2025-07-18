import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Sidebar from './components/sidebar.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<h2>Welcome to Job Portal Dashboard</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
