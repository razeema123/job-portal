import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="sidebar">
      <h2
        className="sidebar-title"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        Job Portal
      </h2>
      <ul className="sidebar-menu">
        <li className={isActive("/postjob") ? "active-link" : ""}>
          <span onClick={() => navigate("/postjob")}>Jobs</span>
        </li>
        <li className={isActive("/user-applications") ? "active-link" : ""}>
          <span onClick={() => navigate("/user-applications")}>Applications</span>
        </li>
      </ul>
    </div>
  );
}
