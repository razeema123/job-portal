import { useState } from "react";
import "./ViewApplications.css";
import Sidebar from "../components/recruiter/SideBar";

export default function ViewApplications() {
  const [editMode, setEditMode] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(1); // Initially 1

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
    setOriginalApp({ ...application }); // store current state for cancel
    setEditMode(true);
  };

  const handleCancel = () => {
    setApplication({ ...originalApp });
    setEditMode(false);
  };

  const handleSave = () => {
    // Simple validation
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
        {["name", "email", "status", "skills", "experience", "responsibilities"].map((field) => (
          <div className="form-field" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {editMode ? (
              <input
                type="text"
                name={field}
                value={application[field]}
                onChange={handleChange}
                required={["name", "email", "status"].includes(field)}
              />
            ) : (
              <p className="view-value">{application[field]}</p>
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
