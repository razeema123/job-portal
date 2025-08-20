import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/recruiter/SideBar";
import "./ViewApplications.css";

export default function ViewApplications() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://job-portal-backend-1-wore.onrender.com/api/applications/${id}`)
        .then((res) => setApplication(res.data))
        .catch((err) => console.error("Failed to load application:", err));
    }
  }, [id]);

  if (!application) {
    return <div style={{ padding: "2rem" }}>Loading application data...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="view-app-container">
        <div className="view-app-header">
          <h2>Application Details</h2>
        </div>

        <form className="form-grid">
          <div className="form-field">
            <label>Name:</label>
            <p className="view-value">{application.name}</p>
          </div>
          <div className="form-field">
            <label>Email:</label>
            <p className="view-value">{application.email}</p>
          </div>
          <div className="form-field">
            <label>Company:</label>
            <p className="view-value">{application.jobId?.company || "N/A"}</p>
          </div>
          <div className="form-field">
            <label>Post Title:</label>
            <p className="view-value">{application.jobId?.title || "N/A"}</p>
          </div>
          <div className="form-field">
            <label>Status:</label>
            <p className="view-value">{application.status}</p>
          </div>
          <div className="form-field">
            <label>Resume:</label>
            <a
              href={`https://job-portal-backend-1-wore.onrender.com/${application.resumePath}`}
              target="_blank"
              rel="noreferrer"
              className="resume-link"
            >
              Download
            </a>
          </div>
          <div className="form-field">
            <label>Phone:</label>
            <p className="view-value">{application.phone || "N/A"}</p>
          </div>
        </form>
      </div>
    </>
  );
}
