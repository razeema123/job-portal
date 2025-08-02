import React, { useState } from "react";
import "./RecruiterProfile.css";
import { FaEnvelope, FaPhone, FaBuilding, FaEdit, FaEye } from "react-icons/fa";

export default function RecruiterProfile({ setOpen }) {
  const initialData = {
    name: "Aiswarya Lakshmi",
    role: "Senior Talent Acquisition",
    email: "aiswarya@example.com",
    phone: "+91 7909171194",
    company: "TechRecruit Solutions",
    about: "Experienced recruiter passionate about connecting talent with opportunity. Specializing in tech and product roles.",
  };

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(initialData);
  const [tempData, setTempData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(tempData);
    setEditMode(false);
   if (setOpen) setOpen(false);
  };

  const handleCancel = () => {
    setTempData(profile);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Profile"
            className="profile-image"
          />
          <button
            className="dropdown-btn"
            onClick={() => setEditMode((prev) => !prev)}
            title={editMode ? "View Mode" : "Edit Profile"}
          >
            {editMode ? <FaEye /> : <FaEdit />}
          </button>
        </div>

        {/* Editable or static fields */}
        <div className="profile-fields">
          {editMode ? (
            <>
              <input
                name="name"
                value={tempData.name}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="role"
                value={tempData.role}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="email"
                value={tempData.email}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="phone"
                value={tempData.phone}
                onChange={handleChange}
                className="input-field"
              />
              <input
                name="company"
                value={tempData.company}
                onChange={handleChange}
                className="input-field"
              />
              <textarea
                name="about"
                value={tempData.about}
                onChange={handleChange}
                className="textarea-field"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-role">{profile.role}</p>
              <p><FaEnvelope /> {profile.email}</p>
              <p><FaPhone /> {profile.phone}</p>
              <p><FaBuilding /> {profile.company}</p>
              <h3>About</h3>
              <p>{profile.about}</p>
            </>
          )}
        </div>

        {/* Buttons */}
        {editMode && (
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
