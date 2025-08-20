import React, { useState, useEffect } from 'react';
import './profile.css';
import {
  FaEnvelope, FaPhone, FaUserGraduate, FaBriefcase, FaCode, FaEdit, FaFileUpload
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewProfile = () => {
  const [editing, setEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [user, setUser] = useState(null); // initially null until API fetch

  // 🔹 Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return toast.error("Please login first.");

        const res = await axios.get('https://job-portal-backend-1-wore.onrender.com/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.error || "Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Save updated profile
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://job-portal-backend-1-wore.onrender.com/api/users/profile',
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile.");
    }
  };

  // 🔹 Handle resume upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeFile(file);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://job-portal-backend-1-wore.onrender.com/api/users/profile/upload-resume',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to upload resume.");
    }
  };

  const toggleEdit = () => {
    if (editing) saveProfile();
    else setEditing(true);
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img
          src="/src/smiling-young-man-illustration_1308-174669.avif"
          alt="Profile"
          className="profile-avatar"
        />
        {!editing ? (
          <>
            <h2>{user.name}</h2>
            <p>{user.title || "No title"}</p>
            <div className="contact-info">
              <p><FaEnvelope /> {user.email}</p>
              <p><FaPhone /> {user.phone || "No phone"}</p>
            </div>
          </>
        ) : (
          <>
            <input type="text" name="name" value={user.name || ""} onChange={handleChange} />
            <input type="text" name="title" value={user.title || ""} onChange={handleChange} />
            <input type="email" name="email" value={user.email || ""} onChange={handleChange} />
            <input type="tel" name="phone" value={user.phone || ""} onChange={handleChange} />
          </>
        )}

        <button className="edit-btn" onClick={toggleEdit}>
          <FaEdit /> {editing ? "Save Profile" : "Edit Profile"}
        </button>

        <label className="resume-upload">
          <FaFileUpload /> {resumeFile ? resumeFile.name : "Upload Resume"}
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} hidden />
        </label>
      </div>

      <div className="profile-details">
        <section>
          <h3><FaUserGraduate /> Education</h3>
          {editing ? (
            <textarea name="education" value={user.education || ""} onChange={handleChange} />
          ) : (
            <p>{user.education || "No education info"}</p>
          )}
        </section>
        <section>
          <h3><FaBriefcase /> Experience</h3>
          {editing ? (
            <textarea name="experience" value={user.experience || ""} onChange={handleChange} />
          ) : (
            <p>{user.experience || "No experience"}</p>
          )}
        </section>
        <section>
          <h3><FaCode /> Skills</h3>
          {editing ? (
            <input
              type="text"
              name="skills"
              value={user.skills?.join(', ') || ""}
              onChange={(e) =>
                setUser({ ...user, skills: e.target.value.split(',').map(s => s.trim()) })
              }
            />
          ) : (
            <ul className="skill-list">
              {user.skills?.map((skill, idx) => <li key={idx}>{skill}</li>) || <li>No skills</li>}
            </ul>
          )}
        </section>
        <section>
          <h3>About Me</h3>
          {editing ? (
            <textarea name="about" value={user.about || ""} onChange={handleChange} />
          ) : (
            <p>{user.about || "No about info"}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewProfile;
