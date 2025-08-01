import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Recruiter Portal</div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/find-jobs" className="nav-link">Find Jobs</Link></li>
        <li><Link to="/postjob" className="nav-link">Post Jobs</Link></li>
        <li><Link to="/recruiter-profile" className="nav-link">Profile</Link></li>
        <li><span className="nav-link logout-link" onClick={handleLogout}>Logout</span></li>
      </ul>
    </nav>
  );
}
