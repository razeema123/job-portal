import React, { useState } from "react";
import Sidebar from "../components/recruiter/SideBar";
import "./ViewUser.css";

export default function ViewUser() {
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: "Charlie Jhon",
    email: "charlie@example.com",
    phone: "9988776655",
    jobTitle: "UI/UX Designer",
    location: "Bangalore",
    company: "TCS",
    status: "Shortlisted",
    resume: "charlie_resume.pdf",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => setEditMode(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setUserData((prev) => ({
        ...prev,
        resume: file.name,
      }));
    }
  };

  const handleSaveClick = () => {
    console.log("Saving data:", userData);
    if (resumeFile) {
      console.log("Uploading file:", resumeFile.name);
    }
    setEditMode(false);
  };

  return (
    <div className="viewuser-container">
      <Sidebar />

      <div className="viewuser-main">
        <div className="viewuser-header">
          <h2>Application Details</h2>
          {!editMode && (
            <button className="edit-btn" onClick={handleEditClick}>
              Edit 
            </button>
          )}
    </div>

        <div className="form-wrapper">
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Job Title", "jobTitle"],
            ["Company", "company"],
            ["Location", "location"],
            ["Status", "status"],
          ].map(([label, key]) => (
            <div className="form-group" key={key}>
              <label>{label}:</label>
              <input
                type="text"
                name={key}
                value={userData[key]}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          ))}

          <div className="form-group">
            <label>Resume:</label>
            <div className="resume-field">
              {editMode ? (
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                />
              ) : (
                <a
                  className="resume-link"
                  href={`/resumes/${userData.resume}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎 {userData.resume}
                </a>
              )}
            </div>
          </div>
        </div>

        {editMode && (
          <div className="button-group">
            <button className="save-btn" onClick={handleSaveClick}>
               Save
            </button>
            <button className="cancel-btn" onClick={handleCancelClick}>
               Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
