import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
        <h2 className="sidebar-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          Job Portal
        </h2>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/postjob")}>Jobs</li>
          <li onClick={() => navigate("/user-applications")}>Applications</li>

      </ul>
    </div>
  );
}
