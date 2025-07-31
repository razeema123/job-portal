import { useState } from "react";
import "./ViewApplications.css";
import Sidebar from "../components/recruiter/SideBar";

export default function ViewApplications() {
  const [editMode, setEditMode] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(1);

  const [application, setApplication] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    resume: "alice_resume.pdf",
    status: "Pending",
    skills: "React, Node.js",
    experience: "2 years",
    responsibilities: "Frontend development, bug fixing",
  });

  const [originalApp, setOriginalApp] = useState({ ...application });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setOriginalApp({ ...application });
    setEditMode(true);
  };

  const handleCancel = () => {
    setApplication({ ...originalApp });
    setEditMode(false);
  };

  const handleSave = () => {
    if (!application.name || !application.email || !application.status) {
      alert("Name, Email and Status are required.");
      return;
    }

    setEditMode(false);
    setSubmittedCount((prev) => prev + 1);
  };

  return (
    <>
      <Sidebar />

      <div className="view-app-container">
        <div className="view-app-header">
          <h2>Application Details</h2>
          {!editMode && (
            <button className="edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>

        <div className="submitted-count">
          Submitted Applications: <strong>{submittedCount}</strong>
        </div>

        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: "Name", name: "name", required: true },
            { label: "Email", name: "email", required: true },
            { label: "Status", name: "status", required: true },
            { label: "Skills", name: "skills" },
            { label: "Experience", name: "experience" },
            { label: "Responsibilities", name: "responsibilities" },
          ].map((field) => (
            <div className="form-field" key={field.name}>
              <label>{field.label}:</label>
              {editMode ? (
                <input
                  type="text"
                  name={field.name}
                  value={application[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              ) : (
                <p className="view-value">{application[field.name]}</p>
              )}
            </div>
          ))}
        </form>

        {editMode && (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
