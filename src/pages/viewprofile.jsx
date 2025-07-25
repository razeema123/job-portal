import React, { useState } from 'react';
import './profile.css';
import {
  FaEnvelope, FaPhone, FaUserGraduate, FaBriefcase, FaCode, FaEdit, FaFileUpload
} from 'react-icons/fa';

const ViewProfile = () => {
  const [editing, setEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const [user, setUser] = useState({
    name: "Nikhil Jayan",
    title: "Frontend Developer",
    email: "nikhil@example.com",
    phone: "+91 9876543210",
    education: "BACHELOR OF COMPUTER APPLICATIONS (BCA) | 2024 | University of Kerala",
    experience: "Fresher | Open to work",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    about: "Hello! I'm a software testing enthusiast with a keen eye for detail and a passion for delivering seamless user experiences. I have hands-on experience with testing web applications, writing test cases, identifying bugs, and collaborating with developers to enhance product quality. Whether it's through manual testing or exploring automation, I take pride in ensuring that products meet both functional and user expectations.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const toggleEdit = () => setEditing(!editing);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src="/src/smiling-young-man-illustration_1308-174669.avif" alt="Profile" className="profile-avatar" />
        {!editing ? (
          <>
            <h2>{user.name}</h2>
            <p>{user.title}</p>
            <div className="contact-info">
              <p><FaEnvelope /> {user.email}</p>
              <p><FaPhone /> {user.phone}</p>
            </div>
          </>
        ) : (
          <>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
            <input type="text" name="title" value={user.title} onChange={handleChange} />
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
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
            <textarea name="education" value={user.education} onChange={handleChange} />
          ) : (
            <p>{user.education}</p>
          )}
        </section>
        <section>
          <h3><FaBriefcase /> Experience</h3>
          {editing ? (
            <textarea name="experience" value={user.experience} onChange={handleChange} />
          ) : (
            <p>{user.experience}</p>
          )}
        </section>
        <section>
          <h3><FaCode /> Skills</h3>
          {editing ? (
            <input
              type="text"
              name="skills"
              value={user.skills.join(', ')}
              onChange={(e) =>
                setUser({ ...user, skills: e.target.value.split(',').map(s => s.trim()) })
              }
            />
          ) : (
            <ul className="skill-list">
              {user.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
            </ul>
          )}
        </section>
        <section>
          <h3>About Me</h3>
          {editing ? (
            <textarea name="about" value={user.about} onChange={handleChange} />
          ) : (
            <p>{user.about}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewProfile;
